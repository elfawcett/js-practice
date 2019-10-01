function Cache(capacity = 5) {
  const hits = new Map()
  const cache = new Map()

  return {
    get,
    put,
  }

  function hit(key) {
    const _hit = hits.get(key)

    hits.set(key, ...(_hit ? { uses: _hit.uses + 1, lastAccess: Date.now() } : { uses: 1, lastAccess: Date.now() }))
  }

  function put(key, value) {
    hit(key)

    /* If at or over capacity, evictLeastUsed until at capacity */
    if (cache.size >= capacity) {
      evictLeastUsed()
    }

    cache.set(key, value)
  }

  function get(key) {
    hit(key)

    return !key || !cache.get(key) ? -1 : cache.get(key)
  }

  function evictLeastUsed() {
    console.log('evict...')

    let leastUsed
    for (let [key, _hit] of hits) {
      if (!leastUsed) {
        leastUsed = [key, _hit]
        continue
      }

      if (_hit.uses )
    }
  }
}

const Favs = new Cache(3)

/*  */
Favs.put('food', 'pizza') // values.food = 'pizza' / hits.food = { uses: 1, lastAccess: Date.now() }
Favs.put('number', 7)
Favs.put('game', 'dota 2')

Favs.get('food') // hits.food = { uses: hits.get('food').uses + 1, lastAccess: Date.now() }
Favs.get('food') // hits.food = { uses: hits.get('food').uses + 1, lastAccess: Date.now() }
Favs.get('food') // hits.food = { uses: hits.get('food').uses + 1, lastAccess: Date.now() }

Favs.get('number') // hits.numer = { uses: hits.get('number').uses + 1, lastAccess: Date.now() }

Favs.put('animal', 'cat') // evict 'game', hits.set('game', { uses: 0, lastAccess: -1 }), hits.set('animal')

/* evict()
  { uses, lastAccess = } hits.get(key)
*/
