import './title-section.scss' 

function TitleSection({children, className = ''}) {
  const classes = className ? className + ' title-section' : ' title-section'

  return (
    <h2 className={classes}>{children}</h2>
  )
}

export default TitleSection