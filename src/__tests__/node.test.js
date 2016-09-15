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

  expect(() => {
    root.equals('bob');
  }).toThrow();
  expect(root.equals(same)).toBe(true);
  expect(root.equals(diff)).toBe(false);
  expect(similar1.equals(similar2)).toBe(false);
  expect(similar1.equals(similar2, equality)).toBe(true);

  root.push(similar);
  expect(root.equals(same)).toBe(false);
  expect(root.equals(similar)).toBe(false);
});

test('traverse depth first preorder', () => {
  var root = new Node('root');
  root.push(new Node('child1'));
  root.push(new Node('child2'));

  expect(root.depthFirstPreOrder()).toEqual({
    data: 'root',
    children: [
      {
        data: 'child1'
      },
      {
        data: 'child2'
      }
    ]
  });
  expect(root.depthFirstPreOrder(true)).toEqual([
    'root', 'child1', 'child2'
  ]);

  root.children[0].push(new Node('child3'));
  root.children[1].push(new Node('child4'));

  expect(root.depthFirstPreOrder()).toEqual({
    data: 'root',
    children: [
      {
        data: 'child1',
        children: [
          {
            data: 'child3'
          }
        ]
      },
      {
        data: 'child2',
        children: [
          {
            data: 'child4'
          }
        ]
      }
    ]
  });
  expect(root.depthFirstPreOrder(true)).toEqual([
    'root', 'child1', 'child3', 'child2', 'child4'
  ]);

  root.children[0].children[0].push(new Node('child5'));
  root.children[0].children[0].push(new Node('child6'));
  expect(root.depthFirstPreOrder()).toEqual({
    data: 'root',
    children: [
      {
        data: 'child1',
        children: [
          {
            data: 'child3',
            children: [
              {
                data: 'child5'
              },
              {
                data: 'child6'
              }
            ]
          }
        ]
      },
      {
        data: 'child2',
        children: [
          {
            data: 'child4'
          }
        ]
      }
    ]
  });
  expect(root.depthFirstPreOrder(true)).toEqual([
    'root', 'child1', 'child3', 'child5', 'child6', 'child2', 'child4'
  ]);
});

/* Node.contains */
test('this node contains node', () => {
  var root = new Node('root');
  var eq = function(me, target) {
    return me._data === target.data &&
      me._parent === target.parent;
  };

  root.push(new Node('child1.1'));
  root.push(new Node('child1.2'));
  root.push(new Node('child1.3'));

  expect(root.contains(root.children[0])).toBe(true);
  expect(root.contains(root.children[1])).toBe(true);
  expect(root.contains(root.children[2])).toBe(true);

  root.children[0].push(new Node('child2.1'));
  root.children[0].push(new Node('child2.2'));
  root.children[0].push(new Node('child2.3'));
  root.children[0].push(new Node('child2.4'));
  root.children[0].push(new Node('child2.5'));

  expect(root.contains(root.children[0].children[3])).toBe(true);

  root.push(new Node('child1.1'));
  expect(root.contains(root.children[3], eq)).toBe(true);
});

/* Node.update */
test('updating a node', () => {
  var root = new Node({name: 'root', id: '_root'});
  var rootTest = new Node({name: 'hi', id: '_root'});
  var test = new Node({name: 'child', id: 'child1.4'});
  var eq = function(me, target) {
    return me.data.id === target.data.id;
  };

  root.push(new Node({name: 'child1.1', id: 'child1.1'}));
  root.push(new Node({name: 'child1.2', id: 'child1.2'}));
  root.push(new Node({name: 'child1.3', id: 'child1.3'}));
  root.push(new Node({name: 'child1.4', id: 'child1.4'}));

  expect(() => {
    root.updateNode(test);
  }).toThrow();
  expect(root.contains(test, eq)).toBe(true);
  expect(root.updateNode(test, eq)).toBe(true);
  expect(root.children[3].data.name).toBe('child');
  expect(root.updateNode(rootTest, eq)).toBe(true);
  expect(root.data.name).toBe('hi');

});
