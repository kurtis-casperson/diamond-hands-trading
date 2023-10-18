import { useState, useContext, useEffect } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import axios from 'axios'
import { fetchStockPrice } from '../../utils/SearchStockMethods'
import { UserContext } from '../../utils/UserContextMethods'
import './TradeModal.css'

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
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)
  let purchaseValue: number
  let transactionValue: number
  const [numberShares, setNumberShares] = useState<number>()
  const [stockPrice, setStockPrice] = useState<number>()
  const [show, setShow] = useState(false)
  const [inSellState, setInSellState] = useState<boolean | null>(null)

  // need to make sure that when the modal closes, the buy and sell cheked values are set to false
  const handleBuyCheckbox = () => {
    setInSellState(false)
  }

  const handleSellCheckbox = () => {
    setInSellState(true)
  }

  const getStockPrice = async () => {
    const getStockPrice = await fetchStockPrice(stockSymbol)
    setStockPrice(getStockPrice)
    handleShow()
  }

  const shareValue = async (stockPrice: number, numberShares: number) => {
    purchaseValue = stockPrice * numberShares
    let roundedShareValue: any = purchaseValue.toFixed(2)
    if (inSellState === false) {
      setCashValue(cashValue - roundedShareValue)
    }
    if (inSellState === true) {
      setCashValue(cashValue + roundedShareValue)
    }
  }

  const handleInputNumberShares = (e: any) => {
    setNumberShares(e.target.value)
  }

  // TODO
  // chnage app so 100000 is added to user acct when they sign up. not on the submit trade
  // take away decimal places

  const submitTrade = async (
    stockSymbol: string,
    stockName: string,
    userId: number | undefined,
    stockPrice: number,
    numberShares: number
  ) => {
    const avaialableCash = cashValue
    transactionValue = stockPrice * numberShares

    if (inSellState === null) {
      alert('select buy or sell')
      return
    } else {
      try {
        let response = await axios.post(`/api/trade/${inSellState}`, {
          user: userId,
          company: stockName,
          symbol: stockSymbol,
          available_cash: avaialableCash,
          total_value: transactionValue,
          shares: numberShares,
        })
        response
      } catch (error) {
        console.error(error)
      }
    }
  }

  useEffect(() => {
    getUserCash(userId)
  }, [])

  const getUserCash = async (userId: number | undefined) => {
    const res = await axios.post(`/api/get_cash/`, {
      userId: userId,
    })
    const cash: number = res.data.rows[0].available_cash
    // const cash: number = res ? res.data.rows[0].available_cash : 100000
    setCashValue(cash)
  }

  // need to set the decimal place to 2

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
          <p className="text-gray-600 text-xs pl-2">Select Buy or Sell</p>
          <div className="flex">
            <div>
              <label
                style={{ color: inSellState === false ? 'green' : 'black' }}
                className="select cursor-pointer rounded-lg border-2 border-gray-200 mr-2 mb-3
   py-1  pr-3 font-bold text-green-500 focus:focus-visible checked  "
              >
                <input
                  type="radio"
                  value="buy"
                  checked={inSellState === false}
                  onChange={handleBuyCheckbox}
                />
                Buy
              </label>
            </div>
            <div className="sell">
              <label
                style={{ color: inSellState === true ? 'red' : 'black' }}
                className="select cursor-pointer rounded-lg border-2 border-gray-200 ml-2 mb-3
   py-1 pr-3 font-bold text-red-500 transition-colors accent-gray-700 peer-checked:bg-gray-200 peer-checked:text-gray-900 peer-checked:border-gray-200 "
              >
                <input
                  type="radio"
                  value="sell"
                  checked={inSellState === true}
                  onChange={handleSellCheckbox}
                />
                Sell
              </label>
            </div>
          </div>
          <div className="row-one">
            <input
              type="number"
              placeholder="Shares to Buy"
              name="shares"
              onChange={handleInputNumberShares}
            ></input>
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
              setInSellState(null)
              // updateCashValue(
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
