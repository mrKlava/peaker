import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Avatar, Button } from '../../UI'

import './navbar.scss'
import { AuthContext } from '../../context/authContext'

function Navbar() {
  const navigate = useNavigate()
  
  const [isActive, setIsActive] = useState(false)
  const { currentUser, logout } = useContext(AuthContext)

  const handleMenu = () => setIsActive(!isActive)
  const handleLogout = async () => {
    try {
      await logout()
    } catch (err) {
      console.log(err)
    }
  }

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
              <Avatar img={currentUser.user_img} small={true} />
            </button>
            <div className={`navbar-profile_menu ${isActive ? 'active ' : ''}`}>
              <ul>
                <li>
                  <Link to={`/profile/${currentUser.user_id}`}>Profile</Link>
                </li>
                <li>
                  <Link to='#' onClick={handleLogout}>
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