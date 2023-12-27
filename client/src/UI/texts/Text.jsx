import React from 'react'
import './text.scss'

function Text({children, size='md', className=''}) {
  const classList = className ? className + ' text' : 'text'

  return (
    <p className={classList}>{children}</p>
  )
}

export default Text