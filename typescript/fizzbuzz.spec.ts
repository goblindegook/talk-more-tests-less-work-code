import { property, int8, suchthat } from 'jsverify'
import { fizzbuzz } from './fizzbuzz'

describe('fizzbuzz()', () => {
  property('fizz', suchthat(int8, i => i % 3 === 0 && i % 5 !== 0),
    (a) => fizzbuzz(a, a)[0] === 'fizz')

  property('buzz', suchthat(int8, i => i % 5 === 0 && i % 3 !== 0),
    (a) => fizzbuzz(a, a)[0] === 'buzz')

  property('fizzbuzz', int8,
    (a) => fizzbuzz(a * 15, a * 15)[0] === 'fizzbuzz')

  property('integer', suchthat(int8, i => i % 3 !== 0 && i % 5 !== 0),
    (a) => fizzbuzz(a, a)[0] === `${a}`)

  property('length', int8, int8,
    (a, b) => fizzbuzz(a, b).length === 1 + Math.abs(b - a))

  property('different successor', int8,
    (a) => fizzbuzz(a, a + 1)[0] !== fizzbuzz(a, a + 1)[1])
})