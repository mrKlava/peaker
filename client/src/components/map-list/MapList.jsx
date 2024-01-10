import { useContext } from 'react'
import { MapContext } from '../../context/mapContext'
import { MapListItem } from '..'

import './map-list.scss'


function MapList() {
  const { displayList } = useContext(MapContext)

  return (
    <section className="map-list">
      <div className="map-list_inner">
      { displayList.map((item) => <MapListItem key={item.peak_id} item={item} />) }
      </div>
    </section>
  )
}

export default MapList