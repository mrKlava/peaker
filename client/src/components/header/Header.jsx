import React from 'react'

import './header.scss'

function Header() {
  const background_img = 'header-bg.jpg'

  return (
    <header className='header'>
      <div className='header-bg' style={
        { background: `center / cover no-repeat url("./assets/images/${background_img}")` }}></div>
      <div className='container'>
        {/* Add later on */}
      </div>
    </header>
  )
}

export default Header


