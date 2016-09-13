import Node from './node';

class Tree {
  constructor(rootData) {
    console.log('Creating a new tree.');
    this._root = new Node(rootData);
  }

  /* Getters */
  get root() {
    return this._root;
  }
}

export default Tree;
