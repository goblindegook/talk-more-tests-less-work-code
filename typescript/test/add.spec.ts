import { property, integer, check, forall } from 'jsverify'

function add (a: number, b: number): number {
  return a + b
}

xdescribe('add()', () => {
  it('commutativity', () => {
    check(forall(integer, integer,
      (a, b) => add(a, b) === add(b, a)))
  })

  // property is a BDD-style shorthand for forall |> check

  property('commutativity (property)', integer, integer,
    (a, b) => add(a, b) === add(b, a))

  property('associativity', integer, integer, integer,
    (a, b, c) => add(add(a, b), c) === add(a, add(b, c)))

  property('identity', integer,
    (a) => add(a, 0) === a)

  property('successor', integer,
    (a) => add(a, 1) > a)

  property('opposites', integer,
    (a) => add(-a, a) === 0)

  property('multiplicative distributivity', integer, integer, integer,
    (a, b, c) => a * add(b, c) === add(a * b, a * c))
})
