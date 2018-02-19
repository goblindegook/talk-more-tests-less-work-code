import { property, integer, suchthat } from 'jsverify'
import { equals, reverse } from 'ramda'
import { fizzbuzz } from '../src/fizzbuzz'

describe('fizzbuzz()', () => {
  property('single fizz', suchthat(integer, i => i % 3 === 0 && i % 5 > 0),
    a => fizzbuzz(a, a)[0] === 'fizz')

  property('single buzz', suchthat(integer, i => i % 5 === 0 && i % 3 > 0),
    a => fizzbuzz(a, a)[0] === 'buzz')

  property('single fizzbuzz', integer,
    a => fizzbuzz(a * 15, a * 15)[0] === 'fizzbuzz')

  property('single integer', suchthat(integer, i => i % 3 > 0 && i % 5 > 0),
    a => fizzbuzz(a, a)[0] === `${a}`)

  property('element order', integer, integer,
    (a, b) => equals(fizzbuzz(a, b), reverse(fizzbuzz(b, a))))
})
