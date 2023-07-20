import { useState } from 'react';
// import TradeModal from '../TradeModal/TradeModal';
import PortfolioTable from './PortfolioTable';
import { TableData } from './type'

// type Props = {
//   portfolioValue: number;
//   stockSymbol: string;
// }

const Portfolio = () => {
    const [tableData, setTableData] = useState<TableData>([]);
    // const [portfolioValue, setPortfolioValue] = useState(10000)
    // take the value from the bought shares and add it to the table.
    // then add or substract from the portfolioValue

    // const changeTableData = (value: string | number) => setTableData(value)
  return (
    // <TradeModal portfolioValue={portfolioValue} />
    <PortfolioTable tableData={tableData} setTableData={setTableData} />
    // 
  )
}

export default Portfolio