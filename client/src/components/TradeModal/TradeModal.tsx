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
  const [modalShares, setModalShares] = useState<number>()

  const handleBuyCheckbox = () => {
    setInSellState(false)
  }

  const handleSellCheckbox = () => {
    setInSellState(true)
  }

  const handleModalActions = async () => {
    handleShow()
    const getStockPrice = await fetchStockPrice(stockSymbol)
    setStockPrice(getStockPrice)

    try {
      const response = await axios.post('/api/stock_data/', {
        userId: userId,
      })

      const requestedData = response.data.tableData.portfolioData

      for (const arr of requestedData) {
        let shares = arr.shares
        let sumOfShares = 0
        sumOfShares += shares
        setModalShares(sumOfShares)
      }
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  const shareValue = async (stockPrice: number, numberShares: number) => {
    purchaseValue = stockPrice * Number(numberShares)
    let roundedShareValue: number = Number(purchaseValue.toFixed(2))

    if (inSellState === false) {
      const cashFunction = (prev: any) => prev - roundedShareValue
      setCashValue(cashFunction(cashValue))
    }
    if (inSellState === true) {
      const cashFunction = (prev: any) => prev + roundedShareValue
      setCashValue(cashFunction(cashValue))
    }
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
    const avaialableCash = cashValue
    transactionValue = stockPrice * numberShares

    if (inSellState === null) {
      alert('select buy or sell')
      return
    }
    if (inSellState === false && transactionValue > avaialableCash) {
      alert(`You don't have enough cash to make this trade`)
      return
    } else {
      try {
        let response = await axios.post(`/api/trade/${inSellState}`, {
          user: userId,
          company: stockName,
          symbol: stockSymbol,
          available_cash: avaialableCash,
          cost_basis: transactionValue,
          shares: numberShares,
        })

        response
      } catch (error) {
        console.error(error)
      }
    }
  }

  useEffect(() => {
    if (show === true) {
      getUserCash(userId)
    }
  }, [show])

  const getUserCash = async (userId: number | undefined) => {
    const res = await axios.post(`/api/get_cash/`, {
      userId: userId,
    })
    const cashResponse: number = res.data.rows[0].available_cash

    setCashValue(cashResponse)
  }

  return (
    <>
      <button
        className="bg-green-400 hover:bg-green-500 font-bold py-1 px-1 rounded-full "
        onClick={() => {
          handleModalActions()
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
            <div>{stockSymbol}</div>
            <div>
              <p className="text-green-400 font-bold translate-x-10 ">
                $ {stockPrice}
              </p>
            </div>
          </Modal.Title>
          <div>
            <p className=" flex text-gray-500 translate-y-10">
              shares: {modalShares}
            </p>
          </div>
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
   py-1 pr-3 font-bold text-red-500 transition-colors accent-gray-700 "
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
