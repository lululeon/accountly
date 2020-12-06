import React from 'react'
import { useTable, usePagination } from 'react-table'
import Paginator from '../Paginator'
import styles from './styles.module.css'

const ReactTable = ({columns, data, rowsPerPage=10}) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    
    // the following are needed for pagination
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state,
  } = useTable({
    columns,
    data,
    initialState: {
      pageSize: rowsPerPage,
      pageIndex: 0,
    },
  }, usePagination)

  return (
    <>
      <table className={styles.accTable}>
        <thead className={styles.hdr}>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th className={styles.hdrcell} {...column.getHeaderProps()}>{column.render('Header')}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row)
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return <td className={styles.cell} {...cell.getCellProps()}>{cell.render('Cell')}</td>
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
      <Paginator 
        canPreviousPage={canPreviousPage}
        canNextPage={canNextPage}
        pageOptions={pageOptions}
        pageCount={pageCount}
        gotoPage={gotoPage}
        nextPage={nextPage}
        previousPage={previousPage}
        setPageSize={setPageSize}
        state={state}
      />
    </>
  )
}

export default ReactTable
