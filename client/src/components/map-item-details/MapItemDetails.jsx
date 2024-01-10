import { useContext } from 'react'
import { MapContext } from '../../context/mapContext'
import { Text, TitleMain } from '../../UI'
import { ReactComponent as IconClose } from '../../assets/images/icons/IconClose.svg'

import './map-item-details.scss'

function MapItemDetails({ item }) {
  const { setSelected } = useContext(MapContext)

  const handelClose = () => setSelected(null)

  return (
    <div className='details'>
      <div className='details-inner'>
        <div className="details_actions">
          <button onClick={handelClose}><IconClose /></button>
        </div>

        <TitleMain className="details_title">{item.name}</TitleMain>

        <div className="details_image">
          <img src={"/assets/images/map/" + item.peak_img} alt={item.name} loading="lazy" />
        </div>

        <div className="details-info">
          <Text>{item.description}</Text>
          <ul className="details-info-list">
            {item.elevation && <li className="details-info_item"><Text>Elevation: <span>{item.elevation}m</span> </Text></li>}
            {item.difficulty && <li className="details-info_item"><Text>Difficulty: <span>{item.difficulty}</span></Text></li>}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default MapItemDetails