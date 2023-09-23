import { Button } from 'react-bootstrap'
import { TableData } from './type'
type Props = {
  tableData: TableData
}

const PortfolioTableRows = ({ tableData }: Props) => {
  return (
    <>
      {tableData.map((portfolioData, index) => (
        <tr key={index}>
          <td>{portfolioData.date}</td>
          <td>{portfolioData.merchant}</td>
          <td>{portfolioData.paymentType}</td>
          <td>{portfolioData.amount}</td>
          <td>
            <Button
              type="submit"
              variant="danger"
              size="sm"
              //   onClick={() => removeDataRow(portfolioData.id)}
            >
              X
            </Button>
          </td>
        </tr>
      ))}
    </>
  )
}
export default PortfolioTableRows
