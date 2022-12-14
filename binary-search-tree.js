class Node {
  constructor(value) {
    this.value = value;
    this.leftChild = null;
    this.rightChild = null;
  }
}

class Tree {
  constructor(arr) {
    this.treeArr = mergeSort([...new Set(arr)]);
    this.root = this.buildTree(this.treeArr, 0, this.treeArr.length - 1);

    // storage for recursive DFS traversal
    this.preorder = [];
    this.inorder = [];
    this.postorder = [];
  }

  buildTree = (arr, left, right) => {
    if (left >= right) return null;

    const middle = parseInt((left + right) / 2);
    const root = new Node(arr[middle]);

    root.leftChild = this.buildTree(arr, left, middle);
    root.rightChild = this.buildTree(arr, middle + 1, right);

    return root;
  };

  insert = (value) => {
    const newNode = new Node(value);
    this.treeArr.push(value);
    if (this.root === null) {
      this.root = newNode;
    } else {
      this.insertHelper(this.root, newNode);
    }
  };

  // recursive insertion helper
  insertHelper = (node, newNode) => {
    if (newNode.value < node.value) {
      if (node.leftChild === null) {
        node.leftChild = newNode;
      } else if (newNode.value > node.leftChild.value) {
        newNode.leftChild = node.leftChild;
        node.leftChild = newNode;
      } else {
        this.insertHelper(node.leftChild, newNode);
      }
    } else {
      if (node.rightChild === null) {
        node.rightChild = newNode;
      } else if (newNode.value < node.rightChild.value) {
        newNode.rightChild = node.rightChild;
        node.rightChild = newNode;
      } else {
        this.insertHelper(node.rightChild, newNode);
      }
    }
  };

  smallestChild = (node) => {
    if (node.leftChild != null) {
      return this.smallestChild(node.leftChild);
    }
    return node.value;
  };

  largestChild = (node) => {
    if (node.rightChild != null) {
      return this.largestChild(node.rightChild);
    }
    return node.value;
  };

  delete = (value, node = this.root) => {
    if (node === null) {
      return node;
    }
    if (value < node.value) {
      node.leftChild = this.delete(value, node.leftChild);
    } else if (value > node.value) {
      node.rightChild = this.delete(value, node.rightChild);
    } else {
      if (node.leftChild === null) return node.rightChild;
      if (node.rightChild === null) return node.leftChild;
      node.value = this.smallestChild(node.rightChild);
      node.rightChild = this.delete(node.value, node.rightChild);
    }
    return node;
  };

  find = (value, node = this.root) => {
    if (node === null) return null;
    if (node.value === value) return node;
    if (node.value > value) return this.find(value, node.leftChild);
    if (node.value < value) return this.find(value, node.rightChild);
  };

  // breadth-first-search
  // time-complexity = O(n)
  // space-complexity = O(n) average/worst - O(1) best case, but unlikely
  levelOrder = (node = this.root) => {
    if (node === null) return null;

    const queue = []; // FIFO queue
    const output = []; // array of tree values stored in level order
    queue.push(node);

    while (queue.length !== 0) {
      const currNode = queue.shift();
      output.push(currNode.value);
      if (currNode.leftChild !== null) queue.push(currNode.leftChild);
      if (currNode.rightChild !== null) queue.push(currNode.rightChild);
    }

    return output;
  };

  // depth-first-search
  // time-complexity = O(n)
  // space-complexity = O(logn) average/best - O(h) worst case, h being height of tree
  inOrder = (node = this.root) => {
    if (node === null) return null;
    this.inOrder(node.leftChild);
    this.inorder.push(node.value);
    this.inOrder(node.rightChild);
  };

  preOrder = (node = this.root) => {
    if (node === null) return null;
    this.preorder.push(node.value);
    this.preOrder(node.leftChild);
    this.preOrder(node.rightChild);
  };

  postOrder = (node = this.root) => {
    if (node === null) return null;
    this.postOrder(node.leftChild);
    this.postOrder(node.rightChild);
    this.postorder.push(node.value);
  };

  height = (node = this.root) => {
    if (node === null) return -1;
    const leftHeight = this.height(node.leftChild);
    const rightHeight = this.height(node.rightChild);
    return Math.max(leftHeight, rightHeight) + 1;
  };

  depth = (value, node = this.root) => {
    if (node === null) return -1;
    let depth = -1;
    if (
      node.value === value ||
      (depth = this.depth(value, node.leftChild)) >= 0 ||
      (depth = this.depth(value, node.rightChild)) >= 0
    ) {
      return depth + 1;
    }
    return depth;
  };

  isBalanced = () => {
    if (
      Math.abs(
        this.height(this.root.leftChild) - this.height(this.root.rightChild)
      ) > 1
    ) {
      return false;
    }
    return true;
  };

  rebalance = () => {
    this.treeArr = mergeSort([...new Set(this.treeArr)]);
    this.root = this.buildTree(this.treeArr, 0, this.treeArr.length - 1);
  };
}

// using the mergesort function I built previously
const merge = (left = [], right = []) => {
  const workingArr = []; // for storing sorted values

  // keep sorting until left and right are empty
  while (left.length > 0 && right.length > 0) {
    // sort the arrays in ascending order by pushing the lowest value onto the working array
    if (left[0] < right[0]) {
      workingArr.push(left.shift());
    } else {
      workingArr.push(right.shift());
    }
  }

  return workingArr.concat(left, right); // merge together the two sorted arrays
};

const mergeSort = (arr = []) => {
  if (arr.length <= 1) return arr; // base case for small arrays that don't need sorting

  const middle = Number(arr.length / 2).toFixed(); // find the middle of the array for splitting
  const left = mergeSort(arr.slice(0, middle)); // sort the left half of the array
  const right = mergeSort(arr.slice(middle, arr.length)); // sort the right half of the array

  return merge(left, right); // merge the two halves together and return
};

// prettyPrint provided by Odin
const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node.rightChild !== null) {
    prettyPrint(node.rightChild, `${prefix}${isLeft ? "|   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "????????? " : "????????? "}${node.value}`);
  if (node.leftChild !== null) {
    prettyPrint(node.leftChild, `${prefix}${isLeft ? "    " : "|   "}`, true);
  }
};

const main = (() => {
  const arr1 = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];

  // create a binary tree from an array of random numbers
  const myBST = new Tree(arr1);
  prettyPrint(myBST.root);

  // insert nodes into the tree
  myBST.insert(2);
  myBST.insert(10);
  prettyPrint(myBST.root);

  console.log(myBST.treeArr);

  // balance the tree by calling rebalance
  myBST.rebalance();
  prettyPrint(myBST.root);

  // delete a node that has two children
  myBST.delete(4);
  prettyPrint(myBST.root);

  // find a node in the tree
  console.log(myBST.find(23));
  prettyPrint(myBST.root);

  // level-order traversal of tree
  console.log(myBST.levelOrder());

  // pre-order traversal of tree
  myBST.preOrder();
  console.log(myBST.preorder);

  // in-order traversal of tree
  myBST.inOrder();
  console.log(myBST.inorder);

  // post-order traversal of tree
  myBST.postOrder();
  console.log(myBST.postorder);

  // find the height of the tree
  console.log("Height of root: " + myBST.height());
  console.log("Height of 2: " + myBST.height(myBST.find(2)));

  // find the depth of a node
  console.log("Depth of 2: " + myBST.depth(2));
  console.log("Depth of 9: " + myBST.depth(9));

  // check to see if the tree is balanced
  console.log(myBST.isBalanced()); //return true

  // unbalance tree
  myBST.insert(50);
  myBST.insert(60);
  myBST.insert(70);
  myBST.insert(80);
  prettyPrint(myBST.root);
  // now check isBalanced
  console.log(myBST.isBalanced());

  // rebalance and check again
  myBST.rebalance();
  prettyPrint(myBST.root);
  console.log(myBST.isBalanced());
})();
