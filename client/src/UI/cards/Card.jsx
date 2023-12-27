import './card.scss'

function Card({children, className='', light=false, article=false}) {
  let classes = className ? className + ' card' : 'card'

  classes = light ? `${classes} card__light` : classes

  return (
    <>
      {
        article
        ? <article className={classes}>{children}</article>
        : <section className={classes}>{children}</section>
      }
    </>
  )
}

export default Card