import { getTransactionsPage } from '../../../utils/queryHelpers'

export default (req, res) => {
  const {
    query: { page },
  } = req
  
  await getTransactionsPage(req, res, page)
}
