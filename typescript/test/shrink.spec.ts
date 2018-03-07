import { property, integer, nat, bless } from 'jsverify'

// Helper

function createArray (length: number): number[] {
  return Array.apply(null, { length }).map((v: any, i: number) => i)
}

// Custom arbitraries

const withShrink = nat.smap(createArray, l => l.length)

const withoutShrink = bless({
  generator: nat.generator.map(createArray)
})

// Function to test (with intentional bug)

function count (list: number[]): number {
  return list.length <= 2 ? list.length : Infinity
}

// Tests

xdescribe('Test', () => {
  property('fails with a shrink', withShrink, list => count(list) === list.length)
  property('fails without a shrink', withoutShrink, list => count(list) === list.length)
})
