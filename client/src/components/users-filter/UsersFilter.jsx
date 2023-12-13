import React from 'react'

import './users-filter.scss'

function UsersFilter() {
  return (
    <section className="users-filter">
      <h1 className="users-filter_title">Find People</h1>
      <input type="text" />
      <input type="text" />
      <input type="text" />
      <select>
        <option value="test">Test</option>
        <option value="test2">Test2 </option>
      </select>
    </section>
  )
}

export default UsersFilter