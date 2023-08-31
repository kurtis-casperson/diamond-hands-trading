import { useState, useContext } from 'react';
// import FocusRefComponent from './focusRefComponent';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import {fetchStockPrice} from '../../utils/SearchStockMethods'
// import { jwtContext } from '../../App';


type Props = {
  
  stockSymbol: string;
  stockName: string;
  portfolioValue: number
  setPortfolioValue: (value: number) => void
}


const TradeModal = ({stockSymbol, stockName, portfolioValue, setPortfolioValue }: Props,  ) => {
  const userId = useContext(jwtContext)
  console.log('userId', userId)
  const [show, setShow] = useState(false);
  const [stockPrice, setStockPrice] = useState<number>();
  const [numberShares, setNumberShares] = useState<number>()
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  let purchaseValue: number;



  const getStockPrice =  async () => {

   const getStockPrice = await fetchStockPrice(stockSymbol)
   setStockPrice(getStockPrice)
   handleShow()

  }
// const fetchData =  async (stockSymbol: string, handleShow: any) => {

//     try {
//         const response = await axios.get(`/api/stock/price/${stockSymbol}`)
//         setStockPrice(response.data)
//         handleShow()
       
//       } catch (error) {
//         console.error(error)
//       }

// }


const shareValue = (stockPrice:number, numberShares: number ) => {
 purchaseValue = stockPrice * numberShares
setPortfolioValue(portfolioValue - purchaseValue)

}

const handleInputNumberShares = (e: any) => {
  setNumberShares(e.target.value)
  }
  // shareValue:(stockPrice:number, numberShares: number) => void,
  const submitTrade = async (stockSymbol: string, stockName: string   ) => {
debugger
  try{ 

let response = await axios.post('/api/trade', {
  userId,
  company: stockName,
  symbol: stockSymbol
})
response
  } catch (error) {
    console.error(error);
   
  }

  }
  return (
    <>
    <button className="bg-green-400 hover:bg-green-500 font-bold py-1 px-1 rounded-full " onClick={()=>{getStockPrice()}} >
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
         
      {/* <FocusRefComponent shareValue={shareValue}/> */}
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