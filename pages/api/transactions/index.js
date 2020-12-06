import { getTransactionsPage } from '../../../utils/queryHelpers'

export default async (req, res) => {
  await getTransactionsPage(req, res, 1)
}
