const { Tree, Node } = require('./tree')

const baseNode = new Node({ value: 0, parent: null, children: [] })
const tree = new Tree(baseNode)

test('it does nothing yet', () => {
  tree.insert(1)
  console.log(tree)

  expect(1).toBe(1)
})
