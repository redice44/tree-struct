// TODO: Move all tree functionality to node. Rename node class to something else.

class Node {
  constructor(data, parent = null) {
    //console.log('Creating a new Node.');
    this._data = data;
    this._parent = parent;
    this._children = [];
    this.depthFirstPreOrder = this.depthFirstPreOrder;
  }

  contains(target, fn) {
    console.log('Checking', this);

    if (this.equals(target, fn)) {
      return true;
    } else {
      let childResult = false;
      for (let c of this.children) {
        if (c.contains(target, fn)) {
          childResult = true;
        }
      }

      return childResult;
    }
  }

  /* Traversals */
  depthFirstPreOrder(isFlat = false) {
    return isFlat ? this._depthFirstPreOrderFlat(this) :
      this._depthFirstPreOrder(this);
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
    n.data = node.data;
    if (node.children.length > 0) {
      n.children = [];

      for (let c of node.children) {
        n.children.push(this._depthFirstPreOrder(c));
      }
    }
    return n;
  }

  /* Checks to see if the Nodes are equal.

    @param
      Node node: Node to check against this Node.
      Function fn (optional): Custom function to handle comparison.

    @return
      true: If they are equal.
      false: If they are not equal.
  */
  equals(node, fn) {
    if (typeof fn === 'function') {
      return fn(this, node);
    }
    return this._data === node.data &&
      this._parent === node.parent &&
      // TODO: Deep comparison of children array
      this._children.length === node.children.length;
  }

  /* Adds the child to the end of the array of children for this Node.

    @param
      child: Is a Node or non-null object.
  */
  // IDEA: Able to add empty nodes, perhaps.
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
