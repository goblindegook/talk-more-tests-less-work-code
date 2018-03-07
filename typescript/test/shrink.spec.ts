import { property, nat, bless } from 'jsverify'
import { range } from 'lodash'

// Custom arbitraries

const withShrink = (size: number) => nat(size).smap(
  max => range(0, max), // generator
  list => list.length   // shrink -> generator(shrink(y)) = y
)

const withoutShrink = (size: number) => bless({
  generator: nat(size).generator.map(max => range(0, max))
})

// Function to test (with intentional bug)

function count (list: number[]): number {
  return list.length <= 2 ? list.length : Infinity
}

// Tests

xdescribe('Test', () => {
  property('fails with a shrink', withShrink(100), list => count(list) === list.length)
  property('fails without a shrink', withoutShrink(100), list => count(list) === list.length)
})
