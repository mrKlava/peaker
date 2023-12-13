import React, { useContext } from 'react'
import './map-aside.scss'
import {MapList, MapMenu} from '../../components'

function MapAside() {

  return (
    <div className='map-aside'>
      <MapMenu />
      <MapList />
    </div>
  )
}

export default MapAside