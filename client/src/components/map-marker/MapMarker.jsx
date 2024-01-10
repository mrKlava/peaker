import { useContext, useRef } from 'react'

import { Marker } from 'react-leaflet'
import { Icon } from "leaflet"
import { MapContext } from '../../context/mapContext'


function MapMarker({ peak }) {
  const { hovered, setHovered, setSelected } = useContext(MapContext)

  const markerRef = useRef()

  const customIcon = new Icon({
    iconUrl: "/assets/images/icons/location.png",
    iconSize: [32, 32],
    iconAnchor: [16, 38],
  })

  const customIconSelected = new Icon({
    iconUrl: "/assets/images/icons/location-selected.png",
    iconSize: [32, 32],
    iconAnchor: [16, 38],
  })

  return (
    <>
      <Marker key={peak.peak_id}
        position={[peak.lat, peak.long]}
        onMouseOver={(e) => console.log()}
        icon={hovered === peak.peak_id ? customIconSelected : customIcon}
        eventHandlers={{
          mouseover: () => setHovered(peak.peak_id),
          mouseout: () => setHovered(null),
          click: () => setSelected(peak),
        }}
        ref={markerRef}
        id={peak.ipeak_id}
      />
    </>
  )
}

export default MapMarker      