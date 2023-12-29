import './text-error.scss'

function Text({ error, className = '' }) {
  const classes = className ? className + ' error' : 'error'

  return (
    <>
      {
        error
          ? <h4 className={classes}>{error}</h4>
          : null
      }    
    </>
  )
}

export default Text