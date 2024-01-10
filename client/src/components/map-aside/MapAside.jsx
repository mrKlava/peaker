import { useContext, useEffect } from "react"
import { MapContext } from "../../context/mapContext"
import { MapItemDetails, MapList, MapMenu } from "../../components"

import "./map-aside.scss"

function MapAside() {
  const { selected } = useContext(MapContext)

  return (
    <div className="map-aside">
      <MapMenu />
      {
        selected === null
          ? <MapList />
          : <MapItemDetails item={selected} />
      }
    </div>
  )
}

export default MapAside