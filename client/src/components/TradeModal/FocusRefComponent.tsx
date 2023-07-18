import { useRef } from "react";

// add the button for buy and sell 
// create the useRef
// when that button is stores that in the ref
// then pass that ref to submit button?
type Props = {
    shareValue: (stockPrice:number, numberShares: number) => void
}


const FocusRefComponent = ({shareValue}: Props) => {

  return (
    <div>focusRefComponent</div>
  )
}

export default FocusRefComponent