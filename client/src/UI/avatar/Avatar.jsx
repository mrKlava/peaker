import './avatar.scss'

function Avatar({img, alt, small=false}) {
  return (
    <div className={small ? "avatar small" : "avatar"}>
      <img src={`/assets/images/${img}`} alt={alt} />
    </div>
  )
}

export default Avatar