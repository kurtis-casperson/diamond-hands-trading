
import { Table } from 'react-bootstrap'
import  { useEffect } from 'react';
import { TableData } from './type'

type Props = {
    tableData: TableData
    setTableData: (value: TableData) => void;
}


const PortfolioTable = ({tableData, setTableData }: Props) => {


  useEffect(() => {
    fetchData();
  }, [tableData]);

  const fetchData = async () => {
    try {
      const response = await fetch('/api/data'); // Replace with your API endpoint
      const jsonData = await response.json();
      setTableData(jsonData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };


  return (
    <>
      <Table id="tableCharacterData" striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>Company</th>
            <th>Symbol</th>
            <th>Value</th>
            <th>Trade</th>
          </tr>
        </thead>

        {/* <tbody>
        {tableData.map((stock, index) => (
          <tr key={index}>
            <td>{stock.company}</td>
            <td>{stock.symbol}</td>
           <td>
           
            </td>
          </tr>
        ))}
        </tbody> */}
      </Table>
    </>
  )
}

export default PortfolioTable

