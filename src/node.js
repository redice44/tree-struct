// TODO: Move all tree functionality to node. Rename node class to something else.

class Node {
  constructor(data, parent = null) {
    //console.log('Creating a new Node.');
    this._data = data;
    this._parent = parent;
    this._children = [];
  }

  static arrayToNodes(arr) {
    if (arr instanceof Array) {
      let c = [];

      for (let v of arr) {
        if (v instanceof Node) {
          c.push(v);
        } else {
          c.push(new Node(v));
        }
      }

      return c;
    }

    throw new InvalidType('Expected Array');
  }

  /* Searches the node for the passed node. If found, replaces the node with the
     passed node.

      @param
        Node node: Node to search for and update in this Node.
        Function fn : Custom function to handle comparison. Required.

      @return
        true: If the node was updated.
        false: If the node is not updated.
  */
  updateNode(node, fn) {
    if (typeof fn === 'function') {
      let result = false;

      if (this.equals(node, fn)) {
        this._updateNode(this, node);
        return true;
      }

      for (let c of this.children) {
        if (c.updateNode(node, fn)) {
          result = true;
        }
      }

      return result;
    }
    throw new InvalidEqFunction('Requires an Equality function.');
  }

  _updateNode(me, node) {
    me._data = Object.assign({}, me._data, node.data);
    me._children = node.children;
  }

  /* Searches the node for the passed node.

      @param
        Node node: Node to search for in this Node.
        Function fn (optional): Custom function to handle comparison.

      @return
        true: If the node is found.
        false: If the node is not found.
  */
  contains(node, fn) {
    let result = false;

    if (this.equals(node, fn)) {
      return true;
    }

    for (let c of this.children) {
      if (c.contains(node, fn)) {
        result = true;
      }
    }

    return result;
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
    if (node instanceof Node) {
      if (typeof fn === 'function') {
        return fn(this, node);
      }
      return this._data === node.data &&
        this._parent === node.parent &&
        // TODO: Deep comparison of children array
        this._children.length === node.children.length;
    }
    throw new InvalidNodeError('Target must be a Node.');
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
    this._children = Node.arrayToNodes(values);
  }

  set parent(value) {
    if (value instanceof Node) {
      this._parent = value;
    } else {
      throw new InvalidNodeError('Parent must be a valid Node.');
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
