import React from 'react'
import './map-menu.scss'
import { HeaderExplore, MapFilters } from '../../components'

function MapMenu() {
  return (
    <div className="map-menu">
      <HeaderExplore />
      <MapFilters />
    </div>
  )
}

export default MapMenu