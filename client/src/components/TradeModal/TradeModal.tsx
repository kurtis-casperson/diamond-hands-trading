import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
const TradeModal = ({stockSymbol}: any) => {
  const [show, setShow] = useState(false);
const [stockPrice, setStockPrice] = useState('');
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
// when the the modal is shown the price is shown of the stock
// and portfolio value 
// get current price of the stock
// create a table with all of the stock inputs for buy and sell

const fetchData =  async (stockSymbol: any) => {

    try {
        const response = await axios.get(`/api/stock/price/${stockSymbol}`)
        setStockPrice(response.data)
        console.log( 'response',response)
      } catch (error) {
  
        console.error(error)
      }

}

  return (
    <>
    <button className="bg-green-400 hover:bg-green-500 text-white font-bold py-1 px-1 rounded-full" onClick={handleShow} >
    Trade {stockSymbol}
    </button>
      {/* <Button variant="secondary" onClick={handleShow}>
       Trade {stockSymbol}
      </Button> */}

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>{stockSymbol}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <p className="font-extralight text-green-400 p-2" > {stockPrice}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => {
            fetchData(stockSymbol)
          }}>
            Close
          </Button>
          <Button variant="primary">Understood</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default TradeModal