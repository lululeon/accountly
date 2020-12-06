const baseUrl = process.env.NEXT_PUBLIC_APP_BASE_URL

export const getTransactionsPage = async (pageNum=1) => {
  const res = await fetch(`${baseUrl}/api/transactions/${pageNum}`)

  const responseData = await res.json()

  // caller must handle
  if (!responseData || !responseData.ok) {
    throw new Error('failed to fetch transactions!')
  }

  const { data } = responseData
  return data
}
