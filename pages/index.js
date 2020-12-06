import React from 'react'
import Head from 'next/head'
import Banner from '../components/Banner'
import ReactTable from '../components/ReactTable/ReactTable'
import styles from '../styles/Home.module.css'

export async function getServerSideProps(context) {
  const baseUrl = process.env.NEXT_PUBLIC_APP_BASE_URL

  try {
    const res = await fetch(`${baseUrl}/api/transactions`)

    const responseData = await res.json()
    if (!responseData || !responseData.ok) throw new Error('failed to fetch transactions!')

    const { data } = responseData

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
  const columns = React.useMemo(
    () => [
      {
        Header: 'Date',
        accessor: 'Date',
      },
      {
        Header: 'Company',
        accessor: 'Company',
      },
      {
        Header: 'Ledger',
        accessor: 'Ledger',
      },
      {
        Header: 'Amount',
        accessor: 'Amount',
      },
    ],
    []
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
            <ReactTable columns={columns} data={data.transactions} />
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
