import { Map, MapAside } from '../../components'

import './explore-page.scss'


function ExplorePage() {
  return (
    <div className="explore">
      <main className="explore-main">
        <MapAside />
        <Map />
      </main>
    </div>
  )
}

export default ExplorePage