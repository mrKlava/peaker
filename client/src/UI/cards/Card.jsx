import './card.scss'

function Card({children, className='', light=false, article=false, onClick, onMouseLeave, onMouseEnter}) {
  let classes = className ? className + ' card' : 'card'

  classes = light ? `${classes} card__light` : classes

  return (
    <>
      {
        article
        ? <article onClick={onClick} onMouseLeave={onMouseLeave} onMouseEnter={onMouseEnter} className={classes}>{children}</article>
        : <section onClick={onClick} onMouseLeave={onMouseLeave} onMouseEnter={onMouseEnter} className={classes}>{children}</section>
      }
    </>
  )
}

export default Card