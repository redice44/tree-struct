class Node {
  constructor(data, parent = null) {
    //console.log('Creating a new Node.');
    this._data = data;
    this._parent = parent;
    this._children = [];
  }

  equals(node, fn) {
    if (typeof fn === 'function') {
      return fn(this, node);
    }
    return this._data === node.data &&
      this._parent === node.parent &&
      // TODO: Deep comparison of children array
      this._children.length === node.children.length;
  }

  push(child) {
    if (child instanceof Node) {
      child.parent = this;
      this._children.push(child);
    } else if (child) {
      this._children.push(new Node(child, this));
    } else {
      throw new InvalidNodeError('Child cannot be null.');
    }
  }

  set children(values) {
    if (values instanceof Array) {
      let c = [];

      for (let v of values) {
        if (v instanceof Node) {
          c.push(v);
        } else {
          c.push(new Node(v));
        }
      }

      this._children = c;
    } else {
      throw new InvalidChildrenError('Children must be an Array of Nodes.');
    }
  }

  set parent(value) {
    if (value instanceof Node) {
      this._parent = value;
    } else {
      throw new InvalidParentError('Parent must be a valid Node.');
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
