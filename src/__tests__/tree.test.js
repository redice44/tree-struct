import Tree from '../tree';
import Node from '../node';

/* Constructor */
test('creates a single node tree', () => {
  var tree = new Tree('root');

  expect(tree.root).toEqual(new Node('root'));
});

/* Depth First Pre-Order traversal */
test('traverse depth first preorder', () => {
  var tree = new Tree('root');
  var node1 = new Node('node1');
  var node2 = new Node('node2');
  var node3  = new Node('node3');
  var node4  = new Node('node4');

  expect(tree.depthFirstPreOrderFlat()).toEqual(['root']);
  expect(tree.depthFirstPreOrder()).toEqual({value: 'root'});
  tree.root.push(node1);

  expect(tree.depthFirstPreOrderFlat()).toEqual(['root', 'node1']);
  expect(tree.depthFirstPreOrder()).toEqual({
    value: 'root',
    children: [
      {
        value: 'node1'
      }
    ]
  });

  tree.root.children[0].push(node2);
  expect(tree.depthFirstPreOrderFlat()).toEqual(['root', 'node1', 'node2']);
  expect(tree.depthFirstPreOrder()).toEqual({
    value: 'root',
    children: [
      {
        value: 'node1',
        children: [
          {
            value: 'node2'
          }
        ]
      }
    ]
  });

  tree.root.push(node3);
  expect(tree.depthFirstPreOrderFlat()).toEqual(
    ['root', 'node1', 'node2', 'node3']);
  expect(tree.depthFirstPreOrder()).toEqual({
    value: 'root',
    children: [
      {
        value: 'node1',
        children: [
          {
            value: 'node2'
          }
        ]
      },
      {
        value: 'node3'
      }
    ]
  });

  tree.root.children[0].push(node4);
  expect(tree.depthFirstPreOrderFlat()).toEqual(
    ['root', 'node1', 'node2', 'node4', 'node3']);
  expect(tree.depthFirstPreOrder()).toEqual({
    value: 'root',
    children: [
      {
        value: 'node1',
        children: [
          {
            value: 'node2'
          },
          {
            value: 'node4'
          }
        ]
      },
      {
        value: 'node3'
      }
    ]
  });

});
