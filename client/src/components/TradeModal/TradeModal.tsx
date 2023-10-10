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
  cashValue: number
  setCashValue: (value: number) => void
}

const TradeModal = ({
  stockSymbol,
  stockName,
  cashValue,
  setCashValue,
}: Props) => {
  const userContext = useContext(UserContext)
  const userId = userContext?.user?.userID
  const [show, setShow] = useState(false)
  const [stockPrice, setStockPrice] = useState<number>()
  const [numberShares, setNumberShares] = useState<number>()
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)
  let purchaseValue: number
  let transactionValue: number
  // useEffect(() => {
  //   shareValue(stockPrice as number, numberShares as number)
  // }, [cashValue])

  const getStockPrice = async () => {
    const getStockPrice = await fetchStockPrice(stockSymbol)
    setStockPrice(getStockPrice)
    handleShow()
  }

  const shareValue = async (stockPrice: number, numberShares: number) => {
    purchaseValue = stockPrice * numberShares
    await setCashValue(cashValue - purchaseValue)
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
    transactionValue = stockPrice * numberShares
    try {
      let response = await axios.post('/api/trade', {
        user: userId,
        company: stockName,
        symbol: stockSymbol,
        total_value: transactionValue,
        shares: numberShares,
      })
      response
    } catch (error) {
      console.error(error)
    }
  }

  const getUserCash = async (userId: number | undefined) => {
    const res = await axios.get(`/api/get_cash/${userId}`)
    const cash: number = res.data.cash
    setCashValue(cash)
  }

  const updateCashValue = async (
    userId: number | undefined,
    stockPrice: number,
    numberShares: number
  ) => {
    try {
      const avaialableCash = cashValue
      transactionValue = stockPrice * numberShares
      console.log('available cash', avaialableCash)
      await axios.post('/api/availableCash', {
        user_id: userId,
        available_cash: avaialableCash,
        transactionValue: transactionValue,
      })
    } catch (err) {
      console.log(err)
    }
  }
  console.log('cash value', cashValue)
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
            <h3>Available Cash: {cashValue}</h3>
          </div>

          <div className="row-one">
            <input
              type="number"
              placeholder="Shares to Buy"
              name="shares"
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
              updateCashValue(
                userId,
                stockPrice as number,
                numberShares as number
              )
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
