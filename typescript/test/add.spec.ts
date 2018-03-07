import { property, integer, number, check, forall } from 'jsverify'

function add (a: number, b: number): number {
  return a + b
}

describe('add()', () => {
  it('commutativity', () => {
    check(forall(number, number,
      (a, b) => add(a, b) === add(b, a)))
  })

  // property is a BDD-style shorthand for forall |> check

  property('commutativity (property)', number, number,
    (a, b) => add(a, b) === add(b, a))

  property('associativity', number, number, number,
    (a, b, c) => add(add(a, b), c) === add(a, add(b, c)))

  property('identity', number,
    (a) => add(a, 0) === a)

  property('successor', number,
    (a) => add(a, 1) > a)

  property('opposites', number,
    (a) => add(-a, a) === 0)

  property('multiplicative distributivity', integer, number, number,
    (a, b, c) => a * add(b, c) === add(a * b, a * c))
})
