import { property, nat, bless } from 'jsverify'
import { range } from 'lodash'

// Function to test (with intentional bug)

function count (list: number[]): number {
  return list.length <= 2 ? list.length : Infinity
}

// Tests

xdescribe('Test without a shrink', () => {
  const unshrinkableArray = (size: number) => bless({
    generator: nat(size).generator.map(max => range(0, max))
  })

  property('fails', unshrinkableArray(200), list => count(list) === list.length)
})

xdescribe('Test with a shrink', () => {
  const shrinkableArray = (size: number) => nat(size).smap(
    max => range(0, max), // generator
    list => list.length   // shrink -> generator(shrink(y)) = y
  )

  property('fails', shrinkableArray(200), list => count(list) === list.length)
})
