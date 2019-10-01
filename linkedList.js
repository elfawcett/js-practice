function Node(value, next, prev) {
  this.value = value
  this.prev = prev
  this.next = next
}

/* head: latest, tail: oldest */
function LinkedList(displayOnChange = true) {
  this.head = null
  this.tail = null
  this.displayOnChange = displayOnChange
}

/* create new node with value, the previous node is the last thing on head,
if already have a head, set head's next to be new node.  otherwise set the tail
to be new node.  then, set the head as new node */
LinkedList.prototype.addToHead = function(value) {
  const node = new Node(value, null, this.head)

  if (this.head) {
    this.head.next = node
  } else {
    this.tail = node
  }

  this.head = node

  if (this.displayOnChange) this.display()
}

/* same as above but from the opposite "direction" */
LinkedList.prototype.addToTail = function(value) {
  const node = new Node(value, this.tail, null)

  if (this.tail) {
    this.tail.prev = node
  } else {
    this.head = node
  }

  this.tail = node

  if (this.displayOnChange) this.display()
}

/* check for a head, store its value for reuse, set this.head to the
previous head value */
LinkedList.prototype.removeHead = function() {
  if (!this.head) return null

  const value = this.head.value
  this.head = this.head.prev

  if (this.head) {
    this.head.next = null
  } else {
    this.tail = null
  }

  if (this.displayOnChange) this.display()
  return value
}

LinkedList.prototype.removeTail = function() {
  if (!this.tail) return null

  const value = this.tail.value
  this.tail = this.tail.next

  if (this.tail) {
    this.tail.prev = null
  } else {
    this.head = null
  }

  if (this.displayOnChange) this.display()
  return value
}

/* search node values from head to tail */
LinkedList.prototype.search = function(value) {
  let current = this.head

  while (current) {
    if (current.value === value) {
      return current
    }

    current = current.prev
  }

  if (this.displayOnChange) this.display()
  return null
}

/* calculate index of node value from tail to head (oldest to newest) */
LinkedList.prototype.indexOf = function(value) {
  const indexes = []
  let current = this.tail
  let index = 0

  while (current) {
    if (current.value === value) {
      indexes.push(index)
      current = current.next
      index++
    }
  }

  if (this.displayOnChange) this.display()
  return indexes
}

/* print out the list as a snake or print out the node with value */
LinkedList.prototype.display = function(value) {
  if (value) {
    console.log(printNode(this.search(value)))
    return
  }

  let current = this.tail
  let outStrings = []

  while (current) {
    if (!current.prev) {
      outStrings.push(`[==TAIL==${printNode(current)}`)
    }

    if (current.prev && current.next) {
      outStrings.push(printNode(current))
    }

    if (!current.next) {
      outStrings.push(`${printNode(current)}==HEAD==>`)
    }

    current = current.next
  }

  // console.log(outStrings.join('=='))
}

LinkedList.prototype.values = function(reverse = false) {
  let current = reverse ? this.head : this.tail

  while (current) {
    console.log(current.value)

    current = reverse ? current.prev : current.next
  }
}

function printNode(node) {
  return `{ prev: ${node.prev && node.prev.value}, value: ${node.value}, next: ${node.next && node.next.value} }`
}

const list = new LinkedList(false)

list.addToHead('eric')
list.addToHead('jess')
list.addToTail('ken')
list.addToHead('jamon')

list.values()
