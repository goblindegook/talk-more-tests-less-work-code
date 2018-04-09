import { property, nat, bless } from 'jsverify'

xdescribe('Arbitrary datetime with bless', () => {
  const datetime = bless({
    generator: nat(Number.MAX_SAFE_INTEGER).generator.map(n => new Date(n * 3600))
    // No shrinker!
  })

  property('generates dates', datetime, d => d instanceof Date)

  // This will fail, but notice how the unshrunk value is less helpful:
  property('generates past dates', datetime, d => d < new Date())
})

xdescribe('Arbitrary datetime with smap', () => {
  const datetime = nat(Number.MAX_SAFE_INTEGER).smap(
    // generator
    n => new Date(n * 3600),
    // shrink
    d => d.getTime() / 3600,
    // show
    d => d.toString()
  )

  property('generates dates', datetime, d => d instanceof Date)

  // This will fail:
  property('generates past dates', datetime, d => d < new Date())
})
