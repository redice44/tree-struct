class Node {
  constructor(data, parent = null) {
    console.log('Creating a new Node.');
    this._data = data;
    this._parent = parent;
    this._children = [];
  }

  push(child) {
    if (child instanceof Node) {
      child.parent = this;
      this._children.push(child);
    } else if (child) {
      this._children.push(new Node(child, this));
    } else {
      // TODO: Handle Invalid Child Error
      console.log('Cannot push child');
    }
  }

  set children(values) {
    if (values instanceof Array) {
      this._children = values;
    } else {
      // TODO: Handle Invalid Children Error
      console.log('Children is not an Array');
    }
  }

  set parent(value) {
    if (value instanceof Node) {
      this._parent = value;
    } else {
      // TODO: Handle Invalid set parent
      console.log('Invalid parent');
    }
  }

  set data(value) {
    this._data = value;
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
