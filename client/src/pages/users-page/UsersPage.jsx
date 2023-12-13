import React from 'react'
import './user-page.scss'
import { UsersCards, UsersFilter } from '../../components'

function UsersPage() {
  const users = [1, 2, 3]
  
  return (
    <main className="users-main">
      <UsersFilter />
      <UsersCards users={users} />
    </main>
  )
}

export default UsersPage