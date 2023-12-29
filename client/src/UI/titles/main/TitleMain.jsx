import './title-main.scss' 

function TitleMain({children, className = ''}) {
  const classes = className ? className + ' title-main' : ' title-main'

  return (
    <h1 className={classes}>{children}</h1>
  )
}

export default TitleMain