function range (a: number, b: number): number[] {
  return a === b ? [a] : [a, ...range(a > b ? a - 1 : a + 1, b)]
}

function isMultipleOf (n: number, m: number): boolean {
  return n % m === 0
}

export function fizzbuzz (a: number, b: number): string[] {
  return range(a, b)
    .map(n =>
      isMultipleOf(n, 15) ? 'fizzbuzz' :
      isMultipleOf(n, 5) ? 'buzz' :
      isMultipleOf(n, 3) ? 'fizz' :
      `${n}`
    )
}