function range (acc: number[], a: number, b: number): number[] {
  const r = [...acc, a]
  return a === b ? r : range(r, a + (a > b ? -1 : 1), b)
}

function multipleOf (n: number, m: number): boolean {
  return n % m === 0
}

export function fizzbuzz (a: number, b: number): string[] {
  return range([], a, b)
    .map(n =>
      multipleOf(n, 15) ? 'fizzbuzz' :
      multipleOf(n, 5) ? 'buzz' :
      multipleOf(n, 3) ? 'fizz' :
      `${n}`
    )
}
