import React from 'react'
import Head from 'next/head'
import Banner from '../components/Banner'
import ReactTable from '../components/ReactTable/ReactTable'
import styles from '../styles/Home.module.css'

const tmpData = [
  {
    Date: '2013-12-22',
    Company: 'SHAW CABLESYSTEMS CALGARY AB',
    Ledger: 'Phone & Internet Expense',
    Amount: '-110.71',
  },
  {
    Date: '2013-11-22',
    Company: 'Greenfields',
    Ledger: 'Dark Ledger',
    Amount: '-73.50',
  },
  {
    Date: '2013-10-22',
    Company: 'The Renegades',
    Ledger: 'Refunds',
    Amount: '550.33',
  }
]

export default function Home() {
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
          <ReactTable columns={columns} data={tmpData} />
        </div>
      </main>

      <footer className={styles.footer}>
          Powered by Magic Rainbows
      </footer>
    </div>
  )
}
