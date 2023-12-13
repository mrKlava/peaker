import React from 'react'
import './explore-page.scss'
import { Map, MapAside } from '../../components'

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