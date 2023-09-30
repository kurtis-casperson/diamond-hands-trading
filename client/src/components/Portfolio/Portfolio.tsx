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
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const response = await axios.post('/api/data', {
        user_id: userId,
      })
      setTableData(response.data)
      console.log('response', response.data)
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  // const portfolioTable = tableData.map((data) => {
  //   return <PortfolioTable key={data} data={data} />
  // })

  // const [portfolioValue, setPortfolioValue] = useState(10000)
  // take the value from the bought shares and add it to the table.
  // then add or substract from the portfolioValue

  // const changeTableData = (value: string | number) => setTableData(value)
  {
    /* // <TradeModal portfolioValue={portfolioValue} /> */
  }
  return (
    <>
      {/* <div>{portfolioTable}</div> */}
      <PortfolioTable tableData={tableData} />
    </>
  )
}

export default Portfolio
