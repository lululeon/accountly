export default async(req, res) => {
  const {
    query: { page },
  } = req
  
  const pageNum = page || '1'
  const trxnApi = process.env.TRXN_API
  const trxnUrl = `${trxnApi}/${pageNum}.json`

  try {
    const result = await fetch(trxnUrl)
    const resultData = await result.json()
    if (!resultData) throw new Error('no data received!')
    res.status(200).json({ data: resultData, ok: true })
  } catch (error) {
    // Ideally this would be sent to a proper error logging stream, not console. But for now:
    console.error(`FAILED to fetch ${trxnUrl}:`, error)
    res.status(200).json({ data: null, ok: false, error: `Failed to fetch data at ${trxnUrl}. Inspect server logs for more detail.`})
  }
}
