import { Table } from 'react-bootstrap'
import { TableData } from './type'

type Props = {
  tableData: TableData
}

const PortfolioTable = ({ tableData }: Props) => {
  let stockChange: string
  const percent: string = '%'
  return (
    <>
      <Table id="tableCharacterData" striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>Symbol</th>
            <th>Company</th>
            <th>Shares</th>
            <th>Cost Basis</th>
            <th>Value</th>
            <th>Change +/- </th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((portfolioData: string | number, index) => (
            <tr key={index}>
              <td>{portfolioData.symbol}</td>
              <td>{portfolioData.company}</td>
              <td>{portfolioData.shares}</td>
              <td>{portfolioData.cost_basis}</td>
              <td>{portfolioData.stockValue}</td>
              <td>
                {
                  (stockChange =
                    (
                      ((portfolioData.stockValue - portfolioData.cost_basis) /
                        portfolioData.cost_basis) *
                      100
                    ).toFixed(2) +
                    ' ' +
                    percent)
                }
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  )
}

export default PortfolioTable
