import { Chart } from 'react-google-charts'

type Props = {}

const PieChart = () => {
  const options = {
    title: 'Portfolio View',
    pieHole: 0.4,
    is3D: false,
  }

  return (
    <div className="mb-4 chart-container shadow-sm">
      {/* @ts-ignore */}
      <Chart
        chartType="PieChart"
        // data={data}
        options={options}
        width={'100%'}
        height={'400px'}
      ></Chart>
    </div>
  )
}

export default PieChart
