import React from 'react'
import { UsersCard } from '../../components'

import './users-cards.scss'

function UsersCards({ users }) {
  return (
    <section className="users-cards">
      {users
        ? users.map((user) => <UsersCard user={user} key={user.user_id} />)
        : <h1>No users found</h1>}
    </section>
  )
}

export default UsersCards