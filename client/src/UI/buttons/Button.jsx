import './button.scss'

function Button({children, onClick, className}) {
  const classes = className ? className + " btn-prm" : "btn-prm"

  return (
    <button onClick={onClick} className={classes}>
      {children}
    </button>
  )
}

export default Button