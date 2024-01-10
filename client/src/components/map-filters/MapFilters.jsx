import { useContext, useEffect } from 'react'
import { MapContext } from '../../context/mapContext'

import { Text, TitleSection } from '../../UI'

import './map-filters.scss'


function MapFilters() {
  return (
    <section className='menu-form'>
      <Text>
        Welcome to our Explore page, your gateway to discovering breathtaking peaks and incredible destinations around the Pyrenes. From majestic mountain peaks that touch the sky to serene valleys nestled between rolling hills, our curated selection showcases the diversity and beauty our planet has to offer. 
      </Text>
      <TitleSection>Scroll through captivating descriptions and vibrant imagery.</TitleSection>
    </section>
  )
}

// function MapFilters() {
//   const { destinations, filter, setFilter } = useContext(MapContext)

//   const handleSearch = () => destinations.filter((destination) => destination.name === filter.search)

//   const handleChange = (e) => {
//     const trg = e.target
    
//     if (trg.type === 'text') setFilter({...filter, search: trg.value})
//     if (trg.type === 'range') setFilter({...filter, altitude: trg.value})
//     if (trg.type === 'checkbox') setFilter({...filter, main: !filter.main})
//   }

//   useEffect(() => {
//     if (filter.search) {
//       console.log(handleSearch())
//     }

//   }, [filter.search])

//   return (
//     <div className='menu-form'>

//       <div>
//         <input type="text" value={filter.search} onChange={handleChange} />
//       </div>

//       <div>
//         <input type="range" min="0" max="8848" value={filter.altitude} onChange={handleChange} step="1" />
//         Min altitude: {filter.altitude} m
//       </div>

//       <div>
//         <input type="checkbox" value={filter.main} onChange={handleChange} />
//         Show only main peaks 
//       </div>

//     </div>
//   )
// }

export default MapFilters