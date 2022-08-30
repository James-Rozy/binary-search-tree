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

  delete = (value, node = this.root) => {
    if (node === null) {
    }
    if (value < node.value) {
      if (value === node.leftChild.value) {
        node.leftChild = node.leftChild.leftChild;
        this.rebalance;
      } else {
        this.delete(value, node.leftChild);
      }
    }
    if (value > node.value) {
      this.delete(value, node.rightChild);
    }
  };

  find = (value, node = this.root) => {
    if (node === null) return null;
    else if (node.value === value) return node;
    else if (node.value > value) return this.find(value, node.leftChild);
    else if (node.value < value) return this.find(value, node.rightChild);
  };

  levelOrder = () => {};

  inOrder = () => {};

  preOrder = () => {};

  postOrder = () => {};

  height = (node) => {};

  depth = (node) => {};

  isBalanced = () => {};

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
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);
  if (node.leftChild !== null) {
    prettyPrint(node.leftChild, `${prefix}${isLeft ? "    " : "|   "}`, true);
  }
};

const main = (() => {
  const arr1 = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];

  const myBST = new Tree(arr1);
  prettyPrint(myBST.root);

  myBST.insert(2);
  myBST.insert(10);
  prettyPrint(myBST.root);
  console.log(myBST.treeArr);
  myBST.rebalance();
  prettyPrint(myBST.root);
  console.log(myBST.find(67));
})();
