import React from 'react'
import { UsersCard } from '../../components'

import './users-cards.scss'

function UsersCards({ users }) {
  return (
    <section className="users-cards">
      {users
        ? users.map((user, i) => <UsersCard user={user} key={i} />)
        : <h1>No users found</h1>}
    </section>
  )
}

export default UsersCards