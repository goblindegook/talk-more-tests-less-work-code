import { property, nat, bless } from 'jsverify'

describe('Arbitrary datetime with smap', () => {
  const datetime = nat.smap(
    // generator
    n => new Date(n * 768000000),
    // shrink
    d => d.getTime() / 768000000,
    // show
    d => d.toString()
  )

  property('generates dates', datetime, d => d instanceof Date)

  // this will fail
  // property('generates future dates', datetime, d => d > new Date())
})

describe('Arbitrary datetime with bless', () => {
  const datetime = bless({
    generator: nat.generator.map(n => new Date(n * 768000000))
    // No shrinker!
  })

  property('generates dates', datetime, d => d instanceof Date)

  // this will fail, but notice how the unshrunk value is less helful
  // property('generates future dates', datetime, d => d > new Date())
})