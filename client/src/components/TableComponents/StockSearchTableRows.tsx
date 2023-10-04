import TradeModal from '../TradeModal/TradeModal'

type Props = {
  stockResultData: { name: string; symbol: string }[]
  cashValue: number
  setCashValue: (value: number) => void
}
const StockSearchTableRows = ({
  stockResultData,
  cashValue,
  setCashValue,
}: Props) => {
  return (
    <>
      {stockResultData.map((stock, index) => (
        <tr key={index}>
          <td>{stock.name}</td>
          <td>{stock.symbol}</td>
          <td>
            <TradeModal
              stockSymbol={stock.symbol}
              stockName={stock.name}
              cashValue={cashValue}
              setCashValue={setCashValue}
            />
          </td>
        </tr>
      ))}
    </>
  )
}

export default StockSearchTableRows
