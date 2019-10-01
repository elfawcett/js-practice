function List() {
  const list = {
    head: null,
    tail: null,
  }

  return {
    status,
    append,
    prepend,
    values: () => values(),
    find,
    cutHead,
    cutTail,
    viewNode,
  }

  function createNode(value, prev = null, next = null) {
    return {
      value,
      prev,
      next,
    }
  }

  /* get current list values */
  function status() {
    return list
  }

  /* add value unless it already exists */
  function append(value) {
    if (find(value)) return null

    const node = createNode(value, list.head)

    if (list.head) {
      list.head.next = node
    } else {
      list.tail = node
    }

    /* assign head */
    list.head = node
  }

  /* prepend value unless it already exists */
  function prepend(value) {
    if (find(value)) return null

    const node = createNode(value, null, list.tail)

    if (list.tail) {
      list.tail.prev = node
    } else {
      list.head = node
    }

    list.tail = node
  }

  /* get all values in the list */
  function values(node = list.tail, output = []) {
    if (node) {
      output = output.concat(node.value)

      if (node.next) {
        return values(node.next, output)
      } else {
        return output
      }
    } else {
      return output
    }
  }

  /* find a value in the list */
  function find(value) {
    let current = list.head

    while (current) {
      if (current.value === value) return current

      current = current.prev
    }

    return null
  }

  /* remove head, return removed value */
  function cutHead() {
    if (!list.head) return null

    const value = list.head.value
    /* reset head to previous node */
    list.head = list.head.prev

    if (list.head) {
      /* set new head.next to null */
      list.head.next = null
    } else {
      /* if there's no head there's no tail */
      list.tail = null
    }

    return value
  }

  function cutTail() {
    if (!list.tail) return null

    const value = list.tail.value
    list.tail = list.tail.next

    if (list.tail) {
      list.tail.prev = null
    } else {
      list.head = null
    }

    return value
  }

  function viewNode(node = list.head, output = {}) {
    output = {
      ...output,
      value: node.value,
      prev: node,
    }
    console.log(output)

    if (node.prev) {
      viewNode(node.prev, output)
    }
  }
}

console.log('\n******\n')
const namesList = List()

namesList.append('eric')
namesList.append('jugs')
namesList.append('jamon')
namesList.prepend('jess')

console.log(namesList.values())
console.log('\n******\n')
