/**
 * The four archetype-specific quality factors described in the manuscript.
 * The frozen full scoring pipeline applies these same expressions internally.
 */
export function qualityFactor(quality, archetype = 'balanced') {
  const q = Number(quality)
  if (!Number.isFinite(q)) throw new TypeError('quality must be finite')

  if (archetype === 'frontier') {
    if (q < 0.92) return 1 / (1 + 3 * (0.92 - q) ** 1.2)
    return 1 + 0.25 * Math.max(0, (q - 0.92) / 0.08) ** 1.5
  }
  if (!['balanced', 'budget', 'speed'].includes(archetype)) {
    throw new RangeError(`unknown archetype: ${archetype}`)
  }
  if (q >= 0.70) return 1
  return 1 / (1 + 1.8 * Math.log(1 + 3.5 * (0.70 - q)))
}
