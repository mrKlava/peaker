import React from 'react'
import './button.scss'

function Button({children}) {
  return (
    <button className="btn-prm">
      {children}
    </button>
  )
}

export default Button