import { Link } from 'react-router-dom'
import { TitleMain } from '../../UI'

import './header-explore.scss'


function HeaderExplore() {
  return (
    <header className="explore-header">
      <nav>
        <Link to="/">
          <TitleMain>Peaker</TitleMain> 
        </Link>
      </nav>
    </header>
  )
}

export default HeaderExplore