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
        <div className='header-inner'>
          <div className='header-image'>
            <img src={`./assets/images/${profile_img}`} alt="" />
          </div>
          <div className='header-post'>
            <div className="header-post_body">
              <textarea name="" id=""></textarea>
            </div>
            <div className="header-post_footer">
              <ul className="post-footer_actions">
                <li className="post-footer_action">
                  <button><IconSmile /></button>
                </li>
                <li className="post-footer_action">
                  <button><IconImage /></button>
                </li>
                <li className="post-footer_action">
                  <button><IconLocation /></button>
                </li>
              </ul>
              <button><IconSend /></button>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header


