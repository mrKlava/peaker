import { createContext, useState } from "react";

export const MapContext = createContext()

export const MapContextProvider = ({ children }) => {
  const [ destinations, setDestinations ] = useState([])
  const [ locationList, setLocationList ] = useState([])
  const [ displayList, setDisplayList ] = useState([])
  const [ clickPosition, setClickPosition ] = useState(null)
  const [ hovered, setHovered ] = useState(null)
  const [ selected, setSelected ] = useState(null)
  const [ filter, setFilter ] = useState({
    search: '',
    altitude: 0,
    main: false
  })

  return (
    <MapContext.Provider value={
      {
        locationList
        ,destinations
        ,displayList
        ,clickPosition
        ,hovered
        ,selected
        ,filter
        ,setLocationList
        ,setDestinations
        ,setDisplayList
        ,setClickPosition
        ,setHovered
        ,setSelected
        ,setFilter
      }
    }>
      {children}
    </MapContext.Provider>
  )
}