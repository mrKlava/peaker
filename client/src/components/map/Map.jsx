import { useState, useEffect, useContext } from 'react'
import { MapContainer, TileLayer, useMapEvents } from 'react-leaflet'
import { MapContext } from '../../context/mapContext'
import { MapMarker } from '../../components'

import 'leaflet/dist/leaflet.css'
import './map.scss'


function Map({ locations }) {
  const INIT_ZOOM = 11
  const VIGNEMAL = [42.77392033020782, -0.14734890869334105]

  const { filter, setDisplayList, setClickPosition, setDestinations } = useContext(MapContext)

  const [markers, setMarkers] = useState([])
  const [zoom, setZoom] = useState(INIT_ZOOM)
  const [viewPort, setViewPort] = useState(null)


   /* Map events */

   const MapEvents = () => {
    const map = useMapEvents({
      click(e) {
        setClickPosition([e.latlng.lat, e.latlng.lng])
        console.log(e.latlng)
      },
      zoom() {
        setViewPort({ ...map.getBounds() })
        setZoom(map.getZoom())
        updateMarkers()

        console.log(map.getZoom())
      },
      moveend() {
        setViewPort({ ...map.getBounds() })
      },
    })

    return null
  }


  /* Setters and updaters for states */

  const initViewPort = (e) => setViewPort({ ...e.target.getBounds() })
  const updateDisplay = () => setDisplayList(getList(markers))
  const updateMarkers = () => setMarkers(getMarkers(locations))


  /* Getters for values */

  const getMarkers = (list) => {

    // return list

    return list.filter((location) => {
      if (zoom <= 12) {
        if (location.elevation >= 3200 || location.main) {
          return location
        }
      } else if (zoom <= 13) {
        if (location.elevation >= 3100 || location.main) {
          return location
        }
      } else if (zoom <= 14) {
        if (location.elevation >= 1500 || location.main) {
          return location
        }
      } else if (zoom >= 14) {
        return location
      }
    })
  }

  const getList = (list) => {
    let newList = list

    return newList.filter((location) => {
      if (
        ((location.lat >= viewPort._southWest.lat) && (location.lat <= viewPort._northEast.lat))
        &&
        ((location.long >= viewPort._southWest.lng) && (location.long <= viewPort._northEast.lng))
      ) {
        return location
      }
    })
  }

  // testing
  useEffect(() => {
    setDestinations(locations)
  }, [])
  // end testing

  useEffect(() => {
    if (viewPort) {
      updateDisplay()
    }
  }, [viewPort])

  useEffect(() => {
    updateMarkers()
  }, [filter])

  useEffect(() => {
    updateDisplay()
  }, [markers])

  useEffect(() => {
    updateMarkers()
  }, [zoom])


  return (
    <div className="map">
      <MapContainer
        className='test'
        center={VIGNEMAL}
        zoom={INIT_ZOOM}
        whenReady={initViewPort}

        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        { markers.map((peak) => <MapMarker key={peak.peak_id} peak={peak} />) }

        <MapEvents />
      </MapContainer>
    </div>
  )
}

export default Map