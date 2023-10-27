import { Chart } from 'react-google-charts'
import { useState, useEffect } from 'react'
type Props = {
  holdings: any
}

const PieChart = ({ holdings }: Props) => {
  const [data, setData] = useState<(string | number | {})[][]>([])

  useEffect(() => {
    const holdingData = [['symbol', 'amount'], []]
  }, [holdings])

  const options = {
    title: 'Portfolio View',
    pieHole: 0.4,
    is3D: false,
  }
  if (!holdings) {
    return ''
  }
  return (
    <div className="mb-4 chart-container shadow-sm">
      {/* @ts-ignore */}
      <Chart
        chartType="PieChart"
        data={holdings}
        options={options}
        width={'100%'}
        height={'400px'}
      ></Chart>
    </div>
  )
}

export default PieChart
