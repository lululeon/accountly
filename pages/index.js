import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import Banner from '../components/Banner'
import ReactTable from '../components/ReactTable/ReactTable'
import { getTransactionsPage } from '../utils/clientHelpers'
import styles from '../styles/Home.module.css'
import { toCurrency, rightAligned, toFriendlyDate } from '../utils/display'

export async function getServerSideProps(context) {
  try {
    const data = await getTransactionsPage()
    return {
      props: { data }, // will be passed to the page component as props
    }  
  } catch (error) {
    return {
      props: { data: null },
    }
  }
}

export default function Home({data}) {
  // these initial settings imply that if the very first fetch fails, or has not data, we treat the data source as failing or empty
  // and no further attempts to fetch occur, because we set the expected "totalCount" to 0.
  const [lastFetchedPage, setLastFetchedPage] = useState(1)
  const [totalCount] = useState(data?.totalCount || 0)
  const [totalData, setTotalData] = useState(data?.transactions || [])
  const [totalAmount, setTotalAmount] = useState(0)

  // this side effect is responsible for fetching the next page as long as the total dataset has not been fetched:
  useEffect(() => {
    (async() => {
      if (totalData.length < totalCount) {
        const nextPage = lastFetchedPage + 1
        try {
          const newData = await getTransactionsPage(nextPage)
          const { transactions } = newData

          // for simplicity, assuming 'totalCount' number of transactions does not change between fetches.
          setLastFetchedPage(nextPage)
          setTotalData(totalData.concat(transactions))
        } catch (error) {
          console.error('an error occured while fetching more data.', error)
        }
      }
    })()
  }, [totalData])

  // get the sum of all transaction amounts
  // (assumption based on mockup: value at top of amounts column is a total; an average would not make much sense):
  useEffect(() => {
    const sum = totalData.map(trxn => parseFloat(trxn['Amount'])).reduce((total, nextValue) => total += nextValue)
    setTotalAmount(sum)
  }, [totalData])
  
  const columns = React.useMemo(
    () => [
      {
        Header: 'Date',
        accessor: 'Date',
        width: 100,
        Cell: (props) => toFriendlyDate(props.value)
      },
      {
        Header: 'Company',
        accessor: 'Company',
        extraClass: 'bolder',
      },
      {
        Header: 'Account',
        accessor: 'Ledger',
      },
      {
        // right-align monetary values so decimal points line up for easier reading:
        Header: () => rightAligned(toCurrency(totalAmount)),
        Cell: (props) => rightAligned(toCurrency(props.value)),
        accessor: 'Amount',
        extraClass: 'bolder',
      },
    ],
    [totalAmount]
  )

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Banner />
        <div className={styles.grid}>
          { data ? (
            <ReactTable columns={columns} data={totalData} rowsPerPage={10} />
          ) : (
            <div className={styles.error}>
              <h3>An Error occurred while fetching data!</h3>
              <p>Please try again or reach out to us for assistance!</p>
            </div>
          )}
        </div>
      </main>

      <footer className={styles.footer}>
          Powered by Magic Rainbows
      </footer>
    </div>
  )
}
