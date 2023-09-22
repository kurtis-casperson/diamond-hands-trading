import axios from 'axios'
import { Table } from 'react-bootstrap'
import { useEffect } from 'react'
import { TableData } from './type'

type Props = {
  tableData: TableData
  setTableData: (value: TableData) => void
}

const PortfolioTable = ({ setTableData }: Props) => {
  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const response = await axios.get('/api/data')
      return response
      // const jsonData = await response
      // setTableData()
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  return (
    <>
      <Table id="tableCharacterData" striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>Company</th>
            <th>Symbol</th>
            <th>Value</th>
            <th>Change +/-</th>
          </tr>
        </thead>
      </Table>
    </>
  )
}

export default PortfolioTable
