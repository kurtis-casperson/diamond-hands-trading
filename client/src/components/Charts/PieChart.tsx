import { Chart } from 'react-google-charts'
import { useState, useEffect } from 'react'

type PiechartType = {
  stockValue: any
  stockSymbol: any
}

type Props = {
  holdings: PiechartType
}

const PieChart = ({ holdings }: Props) => {
  const [data, setData] = useState<(string | number | {})[][]>([])
  const values = Object.values(holdings)

  useEffect(() => {
    const setPieChartData = () => {
      const holdingData = [['symbol', 'value']]
      const [, stockSymbol, stockValue] = values

      const newSymbolArray = stockSymbol.map((element: any) => {
        return element
      })

      const newValueArray = stockValue.map((element: any) => {
        return element
      })

      newSymbolArray.map((value: any, index: any) => {
        const newPie = [value, newValueArray[index]]
        holdingData.push(newPie)

        return newPie
      })

      setData(holdingData)
    }
    setPieChartData()
  }, [holdings])

  const options = {
    pieHole: 0.4,
    is3D: false,
  }

  return (
    <div className="mb-4 chart-container shadow-sm">
      {/* @ts-ignore */}
      <Chart
        chartType="PieChart"
        data={data}
        options={options}
        width={'100%'}
        height={'600px'}
      ></Chart>
    </div>
  )
}

export default PieChart
