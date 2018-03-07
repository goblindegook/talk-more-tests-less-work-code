import { property, number, integer } from 'jsverify'
import { multiply } from '../src/multiply'

function multiply (a: number, b: number): number {
  return a * b
}

xdescribe('multiply()', () => {
  property('commutativity', number, number,
    (a, b) => multiply(a, b) === multiply(b, a))

  property('associativity', number, integer, number,
    (a, b, c) => multiply(multiply(a, b), c) === multiply(a, multiply(b, c)))

  property('identity element', number,
    (a) => multiply(a, 1) === a)

  property('null element', number,
    (a) => multiply(a, 0) === 0)
})
