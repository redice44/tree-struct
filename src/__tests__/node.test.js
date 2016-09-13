import Node from '../node';

test('creates a root node with no children with "Bob" as data', () => {
  var root = new Node('Bob');

  expect(root.data).toBe('Bob');
  expect(root.parent).toBe(null);
  expect(root.children).toEqual([]);
});

test('pushes a child node to root', () => {
  var root = new Node('root');
  root.push(new Node('child'));

  expect(root.children.length).toBe(1);
  expect(root.children[0].data).toBe('child');
  expect(root.children[0].parent).toBe(root);
});

test('pushes a string child to root', () => {
  var root = new Node('root');
  root.push('child');

  expect(root.children.length).toBe(1);
  expect(root.children[0].data).toBe('child');
  expect(root.children[0].parent).toBe(root);
});

test('pushes an array child to root', () => {
  var root = new Node('root');
  root.push(['child1', 'child2']);

  expect(root.children.length).toBe(1);
  expect(root.children[0].data).toEqual(['child1', 'child2']);
  expect(root.children[0].parent).toBe(root);
});

test('pushes an object child to root', () => {
  var root = new Node('root');
  root.push({name: 'child'});

  expect(root.children.length).toBe(1);
  expect(root.children[0].data).toEqual({name: 'child'});
  expect(root.children[0].parent).toBe(root);
});
