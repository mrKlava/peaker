import React, { useContext } from 'react'
import { ReactComponent as IconLocation } from '../../assets/images/icons/IconLocation.svg'

import './aside.scss'
import { AuthContext } from '../../context/authContext'
import { Button } from '../../UI'

function Aside() {
  const { currentUser } = useContext(AuthContext)

  const handleFollowers = () => {
    console.log('clicked followers')
  }

  const handleFollowing = () => {
    console.log('clicked following')
  }

  const handleFollow = () => {
    console.log('clicked follow')
  }
 
  return (
    <aside className='aside'>

      <section className="aside-picture">
          <img src={`./assets/images/${currentUser.image}`} alt="" />
      </section>

      <section className='aside-social'>
        <div className='aside-social_stats'>
          <div onClick={ handleFollowers }><span>Followers</span>: {currentUser.followers}</div>
          <div onClick={ handleFollowing }><span>Following</span>: {currentUser.following}</div>
        </div>
        <Button onClick={ handleFollow }>Follow</Button>
      </section>

      <section className='aside-bio'>
        <h2 className="aside-bio_name">{currentUser.firstname} {currentUser.lastname}</h2>
        <div className="aside-bio_location">
          <IconLocation />
          {currentUser.city} - {currentUser.country}
        </div>
        <div className="aside-bio_bio">
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