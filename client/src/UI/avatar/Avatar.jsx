import React from 'react'
import './avatar.scss'

function Avatar({img, small=false}) {
  return (
    <div className={small ? "avatar small" : "avatar"}>
      <img src={`/assets/images/${img}`} alt="" />
      {/* <img src={require('./assets/images/' + img)} alt="" /> */}
    </div>
  )
}

export default Avatar