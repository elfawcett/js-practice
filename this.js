this.a = 'global'
function abba() {
  // this.a = 'abba'
  console.log(this.a)
}
;(function() {
  // this.a = 'iife'

  console.log(this.a)
})()

abba()
console.log(this.a)

console.log('\n\n')
console.log(abba.a)
