import test from 'node:test'
import assert from 'node:assert/strict'
import { qualityFactor } from '../src/quality_penalty.js'
import { cesPowerMean, flooredCobbDouglas, topsis, weightedSum } from '../src/baselines.js'

test('the CES square-root mean and linear endpoint match their definitions', () => {
  assert.equal(cesPowerMean([0.25, 1], [1, 1], 0.5), 0.5625)
  assert.equal(cesPowerMean([0.25, 1], [1, 1], 1), 0.625)
})

test('CES has lower substitution at rho 0.5 than the linear mean', () => {
  const imbalanced = [0.01, 1]
  assert.ok(cesPowerMean(imbalanced, [1, 1], 0.5) < weightedSum(imbalanced, [1, 1]))
})

test('floored Cobb-Douglas respects the stated epsilon and geometric mean', () => {
  assert.equal(flooredCobbDouglas([0, 1], [1, 1]), Math.sqrt(0.05))
})

test('frontier and shared archetype penalties join continuously at thresholds', () => {
  assert.equal(qualityFactor(0.92, 'frontier'), 1)
  assert.equal(qualityFactor(0.70, 'balanced'), 1)
  assert.ok(qualityFactor(0.89, 'frontier') < 1)
  assert.ok(qualityFactor(0.69, 'budget') < 1)
})

test('zero-weight coordinates are excluded by the baseline weight normalization', () => {
  assert.equal(weightedSum([0.4, 1], [1, 0]), 0.4)
})

test('TOPSIS gives the ideal point a higher closeness than the anti-ideal', () => {
  const scores = topsis([[1, 1], [0, 0]], [1, 1])
  assert.ok(scores[0] > scores[1])
  assert.equal(scores[0], 1)
  assert.equal(scores[1], 0)
})
