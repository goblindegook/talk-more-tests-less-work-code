import { property, nat, bless } from 'jsverify'

describe('Arbitrary datetime with smap', () => {
  const datetime = nat(Number.MAX_SAFE_INTEGER).smap(
    // generator
    n => new Date(n),
    // shrink
    d => d.getTime(),
    // show
    d => d.toString()
  )

  property('generates dates', datetime, d => d instanceof Date)

  // This will fail:
  property('generates future dates', datetime, d => d > new Date())
})

describe('Arbitrary datetime with bless', () => {
  const datetime = bless({
    generator: nat(Number.MAX_SAFE_INTEGER).generator.map(n => new Date(n))
    // No shrinker!
  })

  property('generates dates', datetime, d => d instanceof Date)

  // This will fail, but notice how the unshrunk value is less helpful:
  property('generates future dates', datetime, d => d > new Date())
})
