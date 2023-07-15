import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';

type Props = {
  
  stockSymbol: any;
  portfolioValue: number
  setPortfolioValue: (value: number) => void
}


const TradeModal = ({stockSymbol, portfolioValue, setPortfolioValue }: Props,  ) => {
  // how to pass portfolioValue into the modal? is Portoflio a child of TradeModal?
  // const [portfolioValue, setPortfolioValue] = useState(100000)
  const [show, setShow] = useState(false);
const [stockPrice, setStockPrice] = useState('');
const [buyShares, setBuyShares] = useState('')
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
// when the the modal is shown the price is shown of the stock
// and portfolio value 
// get current price of the stock
// create a table with all of the stock inputs for buy and sell

const fetchData =  async (stockSymbol: any, handleShow: any) => {

    try {
        const response = await axios.get(`/api/stock/price/${stockSymbol}`)
        setStockPrice(response.data)
        handleShow()
        console.log( 'response',response)
      } catch (error) {
        console.error(error)
      }

}


const shareValue = (stockPrice:any, buyShares: any ) => {
let purchaseValue: any = stockPrice * buyShares
setPortfolioValue(portfolioValue - purchaseValue)

}

const handleInputNumberShares = (e: any) => {
  setBuyShares(e.target.value)
  }
  


  return (
    <>
    <button className="bg-green-400 hover:bg-green-500 font-bold py-1 px-1 rounded-full " onClick={()=>{fetchData(stockSymbol, handleShow)}} >
    Trade {stockSymbol}
    </button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
       
      >
        <Modal.Header closeButton>
          <Modal.Title
           style={{
            justifyContent: 'space-between',
            display: 'flex',
            width: '100%',
          }}
          >{stockSymbol}
          <div>
        <p className="text-green-400 font-bold p-2" >$ {stockPrice}</p>
        </div>
        </Modal.Title>
        </Modal.Header>
        <Modal.Body>
      <div>
        <h3>Available Cash: {portfolioValue}</h3>
      </div>
         
            <div className="row-one">
            <input
              type="number"
              placeholder="Shares to Buy"
              name="shares"
              // value={}
              onChange={handleInputNumberShares}
            ></input>
         
        <button className="bg-green-400 hover:bg-green-500 font-bold py-1 px-1 rounded-full " onClick={()=>{fetchData(stockSymbol, handleShow)}} >
    Buy
    </button>
    </div>
   
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary"
          onClick={()=>{shareValue(stockPrice, buyShares)}}
          >Submit</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default TradeModal