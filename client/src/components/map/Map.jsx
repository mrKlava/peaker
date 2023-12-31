import { useState, useEffect, useContext } from 'react'
import { MapContainer, Polyline, TileLayer, useMapEvents } from 'react-leaflet'

import "./map.scss"
import 'leaflet/dist/leaflet.css'



function Map() {
  const INIT_ZOOM = 11
  const VIGNEMAL = [42.77392033020782, -0.14734890869334105]


  /* Map events */

  const MapEvents = () => {
    const map = useMapEvents({
      click(e) {
     
        console.log(e.latlng)
      },
      zoom() {

      },
      moveend() {
       
      },
    })

    return null
  }

  return (
    <div className='map'>
      <MapContainer
        center={VIGNEMAL}
        zoom={INIT_ZOOM}
        scrollWheelZoom={true}
      >
        <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        <MapEvents />
      </MapContainer>
    </div>
  )
}

export default Map