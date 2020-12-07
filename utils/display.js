import dayjs from 'dayjs'
import advancedFormat from 'dayjs/plugin/advancedFormat'

// needed for app-specific date display format.
dayjs.extend(advancedFormat)

export const toCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount)
}

export const rightAligned = (cellValue) => {
  return <div style={{ textAlign: "right" }}>{cellValue}</div>
}

export const toFriendlyDate = (dateString) => {
  return dayjs(dateString).format('MMM Do, YYYY')
}
