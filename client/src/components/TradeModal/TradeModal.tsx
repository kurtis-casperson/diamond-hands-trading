import { useState } from 'react';
import FocusRefComponent from './FocusRefComponent';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';

type Props = {
  
  stockSymbol: string;
  stockName: string;
  portfolioValue: number
  setPortfolioValue: (value: number) => void
}


const TradeModal = ({stockSymbol, stockName, portfolioValue, setPortfolioValue }: Props,  ) => {
  // how to pass portfolioValue into the modal? is Portoflio a child of TradeModal?
  // const [portfolioValue, setPortfolioValue] = useState(100000)
  const [show, setShow] = useState(false);
const [stockPrice, setStockPrice] = useState<number>();
const [numberShares, setNumberShares] = useState<number>()
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  let purchaseValue: number;
// when the the modal is shown the price is shown of the stock
// and portfolio value 
// get current price of the stock
// create a table with all of the stock inputs for buy and sell

const fetchData =  async (stockSymbol: string, handleShow: any) => {

    try {
        const response = await axios.get(`/api/stock/price/${stockSymbol}`)
        setStockPrice(response.data)
        handleShow()
        console.log( 'response',response)
      } catch (error) {
        console.error(error)
      }

}


const shareValue = (stockPrice:number, numberShares: number ) => {
 purchaseValue = stockPrice * numberShares
setPortfolioValue(portfolioValue - purchaseValue)

}

const handleInputNumberShares = (e: any) => {
  setNumberShares(e.target.value)
  }
  // shareValue:(stockPrice:number, numberShares: number) => void,
  const submitTrade = async (stockSymbol: string, stockName: string   ) => {

  try{
    // const tradeVariables = {
      
    //     'Name': stockName,
    //     'Symbol': stockSymbol,
    //     // 'Value': purchaseValue
    
    // }
// console.log('tradeVariables', tradeVariables)
let response = await axios.post('/api/trade', {
      'name': stockName,
      'symbol': stockSymbol
  })
    // .then((response: any) => {
    //   console.log(response.data);
    // })
    console.log(response.data)
  } catch (error) {
    console.error(error);
   
  }

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
         
      <FocusRefComponent shareValue={shareValue}/>
    </div>
   
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary"
          onClick={()=>{shareValue(stockPrice as number, numberShares as number),
            submitTrade(stockSymbol, stockName)}}
          >Submit</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default TradeModal