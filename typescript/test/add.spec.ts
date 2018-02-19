import { property, number } from 'jsverify'
import { add } from '../src/add'

describe('add()', () => {
  property('commutativity', number, number,
    (a, b) => add(a, b) === add(b, a))

  property('associativity', number, number, number,
    (a, b, c) => add(add(a, b), c) === add(a, add(b, c)))

  property('identity element', number,
    (a) => add(a, 0) === a)

  property('successor', number,
    (a) => add(a, 1) > a)
})
