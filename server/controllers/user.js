import { db } from "../connect.js"

export const getUser = (req, res) => {
  const userID = req.params.userID

  const q = `
  SELECT u.*
        ,i.path AS user_img
  FROM users AS u
  LEFT JOIN images AS i
    ON u.image_id = i.image_id
  WHERE u.user_id = ?
  `

  db.query(q, [userID], (err, data) => {
    if (err) return res.status(500).json(err)

    const {hash, ...user} = data[0]

    return res.status(200).json(user)
  })
}