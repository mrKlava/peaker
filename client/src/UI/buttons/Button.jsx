import './button.scss'

function Button({children, onClick, className, forwardRef}) {
  const classes = className ? className + " btn-prm" : "btn-prm"

  return (
    <button onClick={onClick} className={classes} ref={forwardRef}>
      {children}
    </button>
  )
}

export default Button