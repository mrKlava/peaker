import React from 'react'
import './button.scss'

function Button({children, onClick}) {
  return (
    <button onClick={onClick} className="btn-prm">
      {children}
    </button>
  )
}

export default Button