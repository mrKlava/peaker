import { UsersCard } from '../../components'

import './users-cards.scss'

function UsersCards({ users }) {
  return (
    <>
      {
        users
          ? users.map((user) => <UsersCard user={user} key={user.user_id} />)
          : null
      }
    </>
  )
}

export default UsersCards