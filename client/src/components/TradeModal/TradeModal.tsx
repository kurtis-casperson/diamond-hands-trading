import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const TradeModal = ({stockSymbol}: any) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
// when the the modal is shown the price is shown of the stock
// and portfolio value 
// get current price of the stock
// create a table with all of the stock inputs for buy and sell
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
         
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary">Understood</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default TradeModal