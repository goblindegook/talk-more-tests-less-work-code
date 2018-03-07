function range (acc: number[], a: number, b: number): number[] {
  const r = [...acc, a]
  return a === b ? r : range(r, a + (a > b ? -1 : 1), b)
}

export function fizzbuzz (a: number, b: number): string[] {
  return range([], a, b)
    .map(n =>
      n % 15 === 0 ? 'fizzbuzz' :
      n % 5 === 0 ? 'buzz' :
      n % 3 === 0 ? 'fizz' :
      `${n}`
    )
}
