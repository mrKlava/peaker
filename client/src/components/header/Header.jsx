import React from 'react'
import { ReactComponent as IconSend } from '../../assets/images/icons/IconSend.svg'
import { ReactComponent as IconSmile } from '../../assets/images/icons/IconSmile.svg'
import { ReactComponent as IconImage } from '../../assets/images/icons/IconImage.svg'
import { ReactComponent as IconLocation } from '../../assets/images/icons/IconLocation.svg'
import './header.scss'

function Header() {
  const profile_img = 'user-photo.jpg'
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


