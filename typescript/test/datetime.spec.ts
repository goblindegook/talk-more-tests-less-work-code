import { property, nat, bless } from 'jsverify'

describe('Arbitrary datetime with smap', () => {
  const datetime1 = nat.smap(
    // generator
    n => new Date(n * 768000000),
    // shrink
    d => d.getTime() / 768000000,
    // show
    d => d.toString()
  )

  property('generates dates', datetime1, d => d instanceof Date)

  // this will fail
  // property('generates future dates', datetime1, d => d.getTime() > new Date().getTime())
})

describe('Arbitrary datetime with bless', () => {
  const datetime2 = bless({
    generator: nat.generator.map(n => new Date(n * 768000000))
    // No shrinker!
  })

  property('generates dates', datetime2, d => d instanceof Date)

  // this will fail, but notice how the unshrunk value is less helful
  // property('generates future dates', datetime2, d => d.getTime() > new Date().getTime())
})
