import { property, integer, suchthat, Arbitrary } from 'jsverify'
import { isEqual, range } from 'lodash'

export function fizzbuzz (a: number, b: number): string[] {
  return range(a, b)
    .map(n =>
      n % 15 === 0 ? 'fizzbuzz' :
      n % 5 === 0 ? 'buzz' :
      n % 3 === 0 ? 'fizz' :
      `${n}`
    )
}

describe('fizzbuzz()', () => {
  const multiple = (m: number) => integer.smap(t => t * m, u => u / m)

  const indivisible = (arb: Arbitrary<number>, n: number) =>
    suchthat(arb, u => u % n > 0)

  property('single fizz', indivisible(multiple(3), 5),
    a => isEqual(fizzbuzz(a, a + 1), ['fizz']))

  property('single buzz', indivisible(multiple(5), 3),
    a => isEqual(fizzbuzz(a, a + 1), ['buzz']))

  property('single fizzbuzz', multiple(15),
    a => isEqual(fizzbuzz(a, a + 1), ['fizzbuzz']))

  property('single integer', indivisible(indivisible(integer, 3), 5),
    a => isEqual(fizzbuzz(a, a + 1), [`${a}`]))

  property('multiples of 3 start with fizz',
    multiple(3), a => fizzbuzz(a, a + 1)[0].startsWith('fizz'))

  property('multiples of 5 end with buzz',
    multiple(5), a => fizzbuzz(a, a + 1)[0].endsWith('buzz'))

  property('expected outputs',
    integer, a => [`${a}`, 'fizz', 'buzz', 'fizzbuzz'].includes(fizzbuzz(a, a + 1)[0]))

  property('element sequence', integer, integer,
    (a, b) => isEqual(
      fizzbuzz(a, b),
      range(a, b).map(n => fizzbuzz(n, n + 1)[0])
    )
  )
})
