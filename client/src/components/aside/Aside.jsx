import React from 'react'
import './aside.scss'
// import {IconLocation} from '../../assets/images/icons/index'
import { ReactComponent as IconLocation } from '../../assets/images/icons/IconLocation.svg'

function Aside() {
  return (
    <aside className='aside'>

      <section className='aside-social'>
        <div className='aside-social_stats'>
          <div><span>Followers</span>: 100k</div>
          <div><span>Following</span>: 15</div>
        </div>
        <button>Follow</button>
      </section>

      <section className='aside-bio'>
        <h3>Name SURNAME</h3>
        <div>
          <span><IconLocation /></span>
          Pau, France
        </div>
      </section>

      <section className='aside-locations'>
        <h3>Locations</h3>
      </section>

    </aside>
  )
}

export default Aside