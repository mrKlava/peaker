import { createContext, useEffect, useState } from "react";

export const MapContext = createContext()

export const MapContextProvider = ({ children }) => {
  const [ locationList, setLocationList ] = useState([])
  const [ displayList, setDisplayList ] = useState([])
  const [ clickPos, setClickPos ] = useState(null)
  const [ hovered, setHovered ] = useState(null)
  const [ selected, setSelected ] = useState(null)


  useEffect(() => {
    console.log('load map data')
  }, [])


  return (
    <MapContext.Provider value={
      {
      locationList
       ,displayList
       ,clickPos
       ,hovered
       ,selected
       ,setLocationList
       ,setDisplayList
       ,setClickPos
       ,setHovered
       ,setSelected
      }
    }>
      {children}
    </MapContext.Provider>
  )
}