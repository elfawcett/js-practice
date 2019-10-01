class Node {
  constructor({ value, parent }) {
    this.value = value
    this.parent = parent
  }

  insert(value) {
    this.value = value

    return this
  }
}

class Tree {
  constructor(rootNode = null) {
    this.rootNode = new Node({ value: 0, parent: null })
  }

  insert(value) {
    this.rootNode.insert(value)
  }
}

module.exports = { Tree, Node }
