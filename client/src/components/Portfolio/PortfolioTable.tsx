
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
      const response = await fetch('/api/data'); 
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

      </Table>
    </>
  )
}

export default PortfolioTable

