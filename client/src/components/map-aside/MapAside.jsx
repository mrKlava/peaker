// import { useContext } from 'react'
import { MapList, MapMenu } from '../../components'

import './map-aside.scss'

function MapAside() {

  return (
    <div className='map-aside'>
      <MapMenu />
      <MapList />
    </div>
  )
}

export default MapAside