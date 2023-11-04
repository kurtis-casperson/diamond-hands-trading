import axios from 'axios'
import { useEffect, useContext, useState } from 'react'
import PortfolioTable from './PortfolioTable'
import { TableData } from './type'
import { UserContext } from '../../utils/UserContextMethods'

const Portfolio = () => {
  const [tableData, setTableData] = useState<TableData>([])
  const userContext = useContext(UserContext)
  const user = userContext?.user
  const userId = user?.userID
  useEffect(() => {
    fetchData(userId)
  }, [])

  const fetchData = async (userId: number | undefined) => {
    try {
      const response = await axios.post('/api/stock_data/', {
        userId: userId,
      })

      const requestedData = response.data.tableData.portfolioData
      const stockValue = response.data.sumData.stockValue

      const TableDataArray = requestedData.map((value: any, index: any) => ({
        ...value,
        stockValue: stockValue[index],
      }))

      setTableData(TableDataArray)
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  return (
    <>
      <PortfolioTable tableData={tableData} />
    </>
  )
}

export default Portfolio
