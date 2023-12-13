import React from 'react'
import { Link } from 'react-router-dom'

import './header-explore.scss'

function HeaderExplore() {
  return (
    <header>
      <nav>
        <Link to="/">
        <h1>Peaker</h1> 
        </Link>
      </nav>
    </header>
  )
}

export default HeaderExplore