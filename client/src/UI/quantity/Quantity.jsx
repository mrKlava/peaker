import React, { useEffect, useState } from 'react'

function Quantity({className, number = 0}) {
  const classes = className ? className + ' quantity' : 'quantity'
  const [quantity, setQuantity] = useState(number)

  const handleQuantity = (num) => {
    setQuantity( Math.abs(num) > 999 ? Math.sign(num)*((Math.abs(num)/1000).toFixed(1)) + 'k' : Math.sign(num)*Math.abs(num))
  }

  useEffect(() => handleQuantity(number), [number])

  return (
    <span className={classes}>{quantity}</span>
  )
}

export default Quantity