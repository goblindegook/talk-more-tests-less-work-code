import { property, integer, suchthat, Arbitrary } from 'jsverify'
import { isEqual, range } from 'lodash'

export function fizzbuzz (a: number, b: number): string[] {
  return [...range(a, b), b]
    .map(n =>
      n % 15 === 0 ? 'fizzbuzz' :
      n % 5 === 0 ? 'buzz' :
      n % 3 === 0 ? 'fizz' :
      `${n}`
    )
}

const multiple = (m: number) => integer.smap(t => t * m, u => u / m)

const indivisible = (arb: Arbitrary<number>, n: number) => suchthat(arb, u => u % n > 0)

describe('fizzbuzz()', () => {
  property('single fizz', indivisible(multiple(3), 5),
    a => isEqual(fizzbuzz(a, a), ['fizz']))

  property('single buzz', indivisible(multiple(5), 3),
    a => isEqual(fizzbuzz(a, a), ['buzz']))

  property('single fizzbuzz', multiple(15),
    a => isEqual(fizzbuzz(a, a), ['fizzbuzz']))

  property('single integer', indivisible(indivisible(integer, 3), 5),
    a => isEqual(fizzbuzz(a, a), [`${a}`]))

  property('element sequence', integer, integer,
    (a, b) => isEqual(
      fizzbuzz(a, b),
      [...range(a, b), b].map(n => fizzbuzz(n, n)[0])
    )
  )
})
