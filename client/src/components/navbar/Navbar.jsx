import React from 'react'
import './navbar.scss'
import { Link } from 'react-router-dom'
import { Avatar } from '../../UI'

function Navbar() {
  return (
    <nav className='navbar'>
      <div className="container">
        <div className="navbar-inner">
          <div>
            <ul className='navbar-links'>
              <li>
                <Link to='/'>Feed</Link>
              </li>
              <li>
                <Link to='/explore'>Explore</Link>
              </li>
            </ul>
          </div>
          <div className='navbar-profile'>
            <Link to='/profile/me'>
              <Avatar img="user-photo.jpg" small={true}/>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar