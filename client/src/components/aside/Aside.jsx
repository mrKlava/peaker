import React, { useContext } from 'react'
import { ReactComponent as IconLocation } from '../../assets/images/icons/IconLocation.svg'

import './aside.scss'
import { AuthContext } from '../../context/authContext'
import { Button } from '../../UI'

function Aside() {
  const { currentUser } = useContext(AuthContext)

  return (
    <aside className='aside'>

      <section className="aside-picture">
          <img src={`./assets/images/${currentUser.image}`} alt="" />
      </section>

      <section className='aside-social'>
        <div className='aside-social_stats'>
          <div><span>Followers</span>: {currentUser.followers}</div>
          <div><span>Following</span>: {currentUser.following}</div>
        </div>
        <Button>Follow</Button>
      </section>

      <section className='aside-bio'>
        <h2>{currentUser.firstname} {currentUser.lastname}</h2>
        <div>
          <span><IconLocation /></span>
          {currentUser.city} - {currentUser.country}
        </div>
        <div>
          <h3>Bio</h3>
          <p>
            {currentUser.bio}
          </p>
        </div>
      </section>

      <section className='aside-locations'>
        <h3>Locations</h3>
      </section>

    </aside>
  )
}

export default Aside