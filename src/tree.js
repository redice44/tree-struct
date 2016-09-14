import Node from './node';

class Tree {
  constructor(rootData) {
    this._root = new Node(rootData);
  }

  depthFirstPreOrder() {
    return this._depthFirstPreOrder(this._root);
  }

  depthFirstPreOrderFlat() {
    return this._depthFirstPreOrderFlat(this._root);
  }

  _depthFirstPreOrderFlat(node) {
    let n = [];
    n.push(node.data);
    if (node.children.length > 0) {
      for (let c of node.children) {
        n = n.concat(this._depthFirstPreOrderFlat(c));
      }
    }

    return n;
  }

  _depthFirstPreOrder(node) {
    let n = {};
    n.value = node.data;
    if (node.children.length > 0) {
      n.children = [];

      for (let c of node.children) {
        n.children.push(this._depthFirstPreOrder(c));
      }
    }
    return n;
  }

  /* Getters */
  get root() {
    return this._root;
  }
}

export default Tree;
