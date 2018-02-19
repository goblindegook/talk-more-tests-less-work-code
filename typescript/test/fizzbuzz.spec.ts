import { property, integer, suchthat } from 'jsverify'
import { fizzbuzz } from '../src/fizzbuzz'

describe('fizzbuzz()', () => {
  property('fizz', suchthat(integer, i => i % 3 === 0 && i % 5 !== 0),
    a => fizzbuzz(a, a)[0] === 'fizz')

  property('buzz', suchthat(integer, i => i % 5 === 0 && i % 3 !== 0),
    a => fizzbuzz(a, a)[0] === 'buzz')

  property('fizzbuzz', integer,
    a => fizzbuzz(a * 15, a * 15)[0] === 'fizzbuzz')

  property('integer', suchthat(integer, i => i % 3 !== 0 && i % 5 !== 0),
    a => fizzbuzz(a, a)[0] === `${a}`)

  property('length', integer, integer,
    (a, b) => fizzbuzz(a, b).length === 1 + Math.abs(b - a))

  property('different successor', integer,
    a => fizzbuzz(a, a + 1)[0] !== fizzbuzz(a, a + 1)[1])
})
