import { HeaderExplore, MapFilters } from '../../components'
import './map-menu.scss'


function MapMenu() {
  return (
    <div className="map-menu">
      <HeaderExplore />
      <MapFilters />
    </div>
  )
}

export default MapMenu