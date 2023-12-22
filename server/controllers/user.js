import { db } from "../connect.js"

export const getUser = (req, res) => {
  const userID = req.params.userID

  const q = `
  SELECT *
  FROM users
  WHERE user_id = ?
  `

  console.log(userID)

  db.query(q, [userID], (err, data) => {
    if (err) return res.status(500).json(err)

    const {hash, ...user} = data[0]

    return res.status(200).json(user)
  })
}