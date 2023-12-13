import React from 'react'
import { Avatar, Button } from '../../UI'

import './users-card.scss'

function UsersCard({user}) {
  return (
    <article className="users-card">

      <div className="users-card_content">
        <div className="users-card_img">
          <Avatar img="user-photo.jpg" />
        </div>

        <div className="users-card_bio">
          <p className="users-card_name">Name Surname</p>
          <div className="users-card_location">
            Location
          </div>
        </div>
      </div>

      <div className="users-card_actions">
        <div className="users-card_info">
          <ul>
            <li>Followers</li>
            <li>Following</li>
            <li>Level</li>
          </ul>
        </div>
        <Button>Follow</Button>
      </div>

    </article>
  )
}

export default UsersCard