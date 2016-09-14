import Node from '../node';

/* Constructor */
test('creates a root node', () => {
  var root = new Node('root');

  expect(root.data).toBe('root');
  expect(root.parent).toBe(null);
  expect(root.children).toEqual([]);
});

test('creates a node', () => {
  var root = new Node('root');
  var child = new Node('child', root);

  expect(child.data).toBe('child');
  expect(child.parent).toBe(root);
  expect(child.children).toEqual([]);
});

/* Getters and Setters */

/* Node.data */
test('updates data', () => {
  var node = new Node('node');

  node.data = 'notRoot';
  expect(node.data).toBe('notRoot');
});

/* Node.parent */
test('changes to invalid parent', () => {
  var node = new Node('node');

  expect(() => {
    node.parent = 'invalid';
  }).toThrow();
});

/* Node.children */
test('changes children of root', () => {
  var root = new Node('root');
  var children = [
    new Node('child1'),
    new Node('child2')
  ];

  expect(root.children).toEqual([]);

  root.children = children;
  expect(root.children).toEqual(children);

  root.children = [];
  expect(root.children).toEqual([]);

  expect(() => {
    root.children = 'hi';
  }).toThrow();

  root.children = ['child1', 'child2'];
  expect(root.children.length).toBe(2);
  expect(root.children).toEqual([new Node('child1'), new Node('child2')]);
});

/* Node.push(child) */
test('pushes a node to root', () => {
  var root = new Node('root');
  root.push(new Node('child'));

  expect(root.children.length).toBe(1);
  expect(root.children[0].data).toBe('child');
  expect(root.children[0].parent).toBe(root);
});

test('pushes a non-node to root', () => {
  var root = new Node('root');
  root.push('child');

  expect(root.children.length).toBe(1);
  expect(root.children[0].data).toBe('child');
  expect(root.children[0].parent).toBe(root);
});

test('does not push null to root', () => {
  var root = new Node('root');
  expect(() => {
    root.push(null);
  }).toThrow();
});

/* Node.equals */

test('equal nodes', () => {
  var root = new Node('root');
  var same = new Node('root');
  var diff = new Node('notRoot');
  var similar = new Node('root');
  var similar1 = new Node({name: 'sim', extra: 1});
  var similar2 = new Node({name: 'sim', extra: 2});

  var equality = function(me, test) {
    return me.data.name === test.data.name;
  };

  expect(root.equals(same)).toBe(true);
  expect(root.equals(diff)).toBe(false);
  expect(similar1.equals(similar2)).toBe(false);
  expect(similar1.equals(similar2, equality)).toBe(true);

  root.push(similar);
  expect(root.equals(same)).toBe(false);
  expect(root.equals(similar)).toBe(false);
});
