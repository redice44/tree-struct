class Node {
  constructor(data, parent = null) {
    console.log('Creating a new Node.');
    this._data = data;
    this._parent = parent;
    this._children = [];
  }

  /* Getters */
  get data() {
    return this._data;
  }

  get children() {
    return this._children;
  }

  get parent() {
    return this._parent;
  }
}

export default Node;
