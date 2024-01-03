import React from 'react'
import './text.scss'

function Text({children, size='md', className=''}) {
  const classes = className ? className + ' text' : 'text'

  return (
    <p className={classes}>{children}</p>
  )
}

export default Text