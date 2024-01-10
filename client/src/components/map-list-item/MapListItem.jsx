import { useContext } from "react"
import { MapContext } from "../../context/mapContext"
import { Card, Text, TitleSection } from "../../UI"

import "./map-list-item.scss"

function ListItem({ item }) {

  const { hovered, setHovered, setSelected } = useContext(MapContext)

  const handleEnter = () => setHovered(item.peak_id)
  const handleLeave = () => setHovered(null)
  const handleClick = () => setSelected(item)

  const className = hovered === item.peak_id ? "map-list-item selected" : "map-list-item"

  return (
    <Card className={className}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      onClick={handleClick}
    >

      <TitleSection className="map-list-item_title">{item.name}</TitleSection>

      <div className="map-list-item_image">
        <img src={"/assets/images/map/" + item.peak_img} alt={item.name} loading="lazy" />
      </div>
      <div className="map-list-item_info">
        <ul className="item-info">
          { item.elevation && <li className="item-info_item"><Text>Elevation: <span>{item.elevation}m</span> </Text></li> }
          { item.difficulty && <li className="item-info_item"><Text>Difficulty: <span>{item.difficulty}</span></Text></li> }
        </ul>
      </div>


    </Card>
  )
}

export default ListItem