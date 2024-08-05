import { useLocale } from 'vuetify'
export const useNumberFormatter = () => {
  const { current } = useLocale()
  const formatter = (value: number, options?: {}) => {
    const defaultOptions = {
      useGrouping: true,
      minimumFractionDigits: 2,
    }

    const computedOptions = {
      ...defaultOptions,
      ...options,
    }

    return value
      ? Intl.NumberFormat(current.value || 'en', computedOptions).format(value)
      : ''
  }

  return {
    formatter,
    current,
  }
}
