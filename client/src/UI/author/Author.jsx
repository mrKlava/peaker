import React from 'react'
import { Link } from 'react-router-dom'
import Avatar from '../avatar/Avatar'

import './author.scss'
import moment from 'moment'

function Author({ author, className='', small=false, location=true, date=true }) {
  const classes = className ? 'author ' + className : 'author'

  return (
    <div className={classes}>
      <Link className='author-link' to={`/profile/${author.user_id}`} >
        <Avatar img={author.user_img} small={small} />
        <div className="author-stamp">
          <span className='author-stamp_name'>{author.firstname} {author.lastname}</span>
          { date && author.created && <span className='author-stamp_date'>{moment(author.created).fromNow()} </span> }
          { location && author.location && <span className='author-stamp_location'>{author.location} </span> }
        </div>
      </Link>
    </div>
  )
}

export default Author