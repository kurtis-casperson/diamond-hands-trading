import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const TradeModal = ({stockSymbol}: any) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
// when the the modal is shown the price is shown of the stock
// and portfolio value 
  return (
    <>
    <button className="bg-green-400 hover:bg-green-500 text-white font-bold py-2 px-2 rounded-full" onClick={handleShow} >
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
          <Modal.Title>Modal title</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          I will not close if you click outside me. Don not even try to press
          escape key.
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