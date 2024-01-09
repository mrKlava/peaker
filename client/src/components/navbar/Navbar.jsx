import { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { Avatar } from '../../UI'
import { AuthContext } from '../../context/authContext'

import './navbar.scss'


function Navbar() {
  const { currentUser, logout } = useContext(AuthContext)
  const [ isActive, setIsActive ] = useState(false)

  const handleMenu = () => setIsActive(!isActive)

  const handleLogout = async () => {
    try {
      await logout()
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <nav className="navbar">
      <div className="container">
        <div className="navbar-inner">
          <div>
            <ul className="navbar-links">
              <li>
                <Link to="/">Feed</Link>
              </li>
              <li>
                <Link to="/users">Users</Link>
              </li>
              <li>
                <Link to="/explore">Explore</Link>
              </li>
            </ul>
          </div>
          <div className="navbar-profile">
            <button onClick={handleMenu}>
              <Avatar img={currentUser.user_img} small={true} />
            </button>
            <div className={`navbar-profile_menu ${isActive ? 'active ' : ''}`}>
              <ul>
                <li className="mob-link">
                  <Link onClick={handleMenu} to="/">Feed</Link>
                </li>
                <li className="mob-link">
                  <Link onClick={handleMenu} to="/users">Users</Link>
                </li>
                <li className="mob-link">
                  <Link onClick={handleMenu} to="/explore">Explore</Link>
                </li>
                <li>
                  <Link onClick={handleMenu} to={`/profile/${currentUser.user_id}`}>Profile</Link>
                </li>
                <li>
                  <Link to="#" onClick={handleLogout}>
                    Logout
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar