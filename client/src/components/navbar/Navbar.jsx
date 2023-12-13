import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Avatar } from '../../UI'

import './navbar.scss'

function Navbar() {
  const [isActive, setIsActive] = useState(false)

  const handleMenu = () => setIsActive(!isActive)
  

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
                <Link to='/users'>Users</Link>
              </li>
              <li>
                <Link to='/explore'>Explore</Link>
              </li>
            </ul>
          </div>
          <div className='navbar-profile'>
            {/* <Link to='/profile/me'> */}
            <button onClick={handleMenu}>
              <Avatar img="user-photo.jpg" small={true} />
            </button>
            <div className={`navbar-profile_menu ${isActive ? 'active ' : ''}`}>
              <ul>
                <li>
                  <Link to="/profile/me">Profile</Link>
                </li>
                <li>
                  <Link to="#">
                    Logout
                  </Link>
                </li>
              </ul>
            </div>
            {/* </Link> */}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar