import { useState, useContext, useEffect } from 'react'
// import FocusRefComponent from './focusRefComponent';
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import axios from 'axios'
import { fetchStockPrice } from '../../utils/SearchStockMethods'
import { UserContext } from '../../utils/UserContextMethods'

type Props = {
  stockSymbol: string
  stockName: string
  portfolioValue: number
  setPortfolioValue: (value: number) => void
}

const TradeModal = ({
  stockSymbol,
  stockName,
  portfolioValue,
  setPortfolioValue,
}: Props) => {
  const userContext = useContext(UserContext)
  const userId = userContext?.user?.userID
  const [show, setShow] = useState(false)
  const [stockPrice, setStockPrice] = useState<number>()
  const [numberShares, setNumberShares] = useState<number>()
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)
  let purchaseValue: number

  // useEffect(() => {
  //   const fetchData = async () => {
  //     // const cashData = await getUserCash(userId)
  //   }
  //   fetchData()
  // }, [])

  const getStockPrice = async () => {
    const getStockPrice = await fetchStockPrice(stockSymbol)
    setStockPrice(getStockPrice)
    handleShow()
  }

  const shareValue = (stockPrice: number, numberShares: number) => {
    purchaseValue = stockPrice * numberShares
    setPortfolioValue(portfolioValue - purchaseValue)
  }

  const handleInputNumberShares = (e: any) => {
    setNumberShares(e.target.value)
  }

  const submitTrade = async (
    stockSymbol: string,
    stockName: string,
    userId: number | undefined,
    stockPrice: number,
    numberShares: number
  ) => {
    const transactionValue = stockPrice * numberShares
    try {
      let response = await axios.post('/api/trade', {
        user: userId,
        company: stockName,
        symbol: stockSymbol,
        total_value: transactionValue,
      })
      response
    } catch (error) {
      console.error(error)
    }
  }

  const getUserCash = async (userId: number | undefined) => {
    const res = await axios.get(`/api/get_cash/${userId}`)
    const cash: number = res.data.cash
    setPortfolioValue(cash)
  }

  const updateUserTransactions = async (
    userId: number | undefined,
    stockPrice: number,
    numberShares: number
  ) => {
    const transactionValue = stockPrice * numberShares
    try {
      await axios.post('/api/transaction_value', {
        user_id: userId,
        total_value: transactionValue,
      })
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>
      <button
        className="bg-green-400 hover:bg-green-500 font-bold py-1 px-1 rounded-full "
        onClick={() => {
          getStockPrice()
        }}
      >
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
          >
            {stockSymbol}
            <div>
              <p className="text-green-400 font-bold p-2">$ {stockPrice}</p>
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
          <Button
            variant="primary"
            onClick={() => {
              shareValue(stockPrice as number, numberShares as number),
                submitTrade(
                  stockSymbol,
                  stockName,
                  userId,
                  stockPrice as number,
                  numberShares as number
                )
              // updateUserTransactions(
              //   userId,
              //   stockPrice as number,
              //   numberShares as number
              // )
            }}
          >
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default TradeModal
