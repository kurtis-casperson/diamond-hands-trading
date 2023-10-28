import { Chart } from 'react-google-charts'
import { useState, useEffect } from 'react'
import { PortfolioDataType } from '../../utils/types'
type Props = {
  holdings: PortfolioDataType
}

const PieChart = ({ holdings }: Props) => {
  const [data, setData] = useState<(string | number | {})[][]>([])
  console.log(holdings)
  // const newArray = new Array<PortfolioDataType>()
  // console.log('newArray', newArray)
  useEffect(() => {
    const holdingData = [['symbol', 'value']]
    // for (let holding in holdings) {
    //   const { stockSymbol, stockValue } = holding

    //   holdingData.push([stockSymbol, stockValue])
    //   console.log(holdingData)
    // }
    // TODO
    // change this to an array of objects
    const { stockSymbol, stockValue } = holdings
    holdingData.push([stockSymbol.toString(), stockValue.toString()])
    console.log('holdingData', holdingData)
    setData(holdingData)
  }, [holdings])

  const options = {
    title: 'Portfolio View',
    pieHole: 0.4,
    is3D: false,
  }
  if (!holdings) {
    // error loading chart message
    return ''
  }
  return (
    <div className="mb-4 chart-container shadow-sm">
      {/* @ts-ignore */}
      <Chart
        chartType="PieChart"
        data={data}
        options={options}
        width={'100%'}
        height={'400px'}
      ></Chart>
    </div>
  )
}

export default PieChart
