export const oilUnits = ['bbl', 'm³', 't'] as const
export type IOilUnit = typeof oilUnits[number]

export const oilUnitsConvertRatio = (entryUnit: IOilUnit, resultUnit: IOilUnit): number | undefined => {
  if (!oilUnits.includes(entryUnit) || !oilUnits.includes(resultUnit)) return undefined
  if (entryUnit === resultUnit) return 1
  if (entryUnit === 'bbl') {
    if (resultUnit === 'm³') return 0.1589872949
    if (resultUnit === 't') return 0.0561458333
  }
  if (entryUnit === 'm³') {
    if (resultUnit === 'bbl') return 6.2898107704
    if (resultUnit === 't') return 0.3531466672
  }
  if (entryUnit === 't') {
    if (resultUnit === 'bbl') return 17.8107606679
    if (resultUnit === 'm³') return 2.8316846592
  }
  return entryUnit
}
