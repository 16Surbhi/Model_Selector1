/** Baseline aggregators used in the frozen cohort comparisons. */
function normalizedWeights(weights) {
  const total = weights.reduce((sum, x) => sum + x, 0)
  if (!weights.length || total <= 0 || weights.some((x) => !Number.isFinite(x) || x < 0)) {
    throw new TypeError('weights must be finite, non-negative, and have a positive sum')
  }
  return weights.map((x) => x / total)
}

export function weightedSum(values, weights) {
  const w = normalizedWeights(weights)
  if (values.length !== w.length) throw new RangeError('values and weights must have equal length')
  return values.reduce((sum, value, i) => sum + value * w[i], 0)
}

export function cesPowerMean(values, weights, rho = 0.5) {
  const w = normalizedWeights(weights)
  if (values.length !== w.length || !(rho > 0 && rho <= 1)) {
    throw new RangeError('expected equal-length vectors and 0 < rho <= 1')
  }
  return values.reduce((sum, value, i) => sum + w[i] * value ** rho, 0) ** (1 / rho)
}

export function flooredCobbDouglas(values, weights, floor = 0.05) {
  const w = normalizedWeights(weights)
  if (values.length !== w.length || !(floor > 0 && floor <= 1)) {
    throw new RangeError('expected equal-length vectors and 0 < floor <= 1')
  }
  return values.reduce((product, value, i) => product * Math.max(value, floor) ** w[i], 1)
}

export function topsis(matrix, weights) {
  const w = normalizedWeights(weights)
  if (!matrix.length || matrix.some((row) => row.length !== w.length)) {
    throw new RangeError('matrix rows must be non-empty and match the weight count')
  }
  const norms = w.map((_, j) => Math.sqrt(matrix.reduce((sum, row) => sum + row[j] ** 2, 0)))
  const weighted = matrix.map((row) => row.map((value, j) => (value / (norms[j] || 1)) * w[j]))
  const ideal = w.map((_, j) => Math.max(...weighted.map((row) => row[j])))
  const antiIdeal = w.map((_, j) => Math.min(...weighted.map((row) => row[j])))
  return weighted.map((row) => {
    const toIdeal = Math.sqrt(row.reduce((sum, value, j) => sum + (value - ideal[j]) ** 2, 0))
    const toAntiIdeal = Math.sqrt(row.reduce((sum, value, j) => sum + (value - antiIdeal[j]) ** 2, 0))
    return toAntiIdeal / (toIdeal + toAntiIdeal || 1)
  })
}
