import { db } from "../connect.js"
import jwt from "jsonwebtoken"

export const getUsers = (req, res) => {
  const token = req.cookies.accessToken

  if (!token) return res.status(401).json("Not Authorized")

  jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
    if (err) return res.status(403).json("Token is not valid")

    const q = `
    SELECT u.user_id
          ,u.firstname
          ,u.lastname
          ,IF (u.city_id IS NULL, NULL, CONCAT(ci.name, ', ', co.name)) as location
          ,IF (i.image_id IS NULL, 'no-img.png', i.path) AS user_img
    FROM users AS u
    LEFT JOIN images AS i
      ON u.image_id = i.image_id
    LEFT JOIN cities AS ci
      ON u.city_id = ci.city_id
    LEFT JOIN countries AS co
      ON ci.country_id = co.country_id
    LIMIT 100
    `  

    db.query(q, [], (err, data) => {
      if (err) return res.status(500).json(err)

      return res.status(200).json(data)
    })
  })
}

export const getUser = (req, res) => {
  const userID = req.params.userID

  const q = `
  SELECT u.*
        ,IF (u.city_id IS NULL, NULL, CONCAT(ci.name, ', ', co.name)) as location
        ,IF (i.image_id IS NULL, 'no-img.png', i.path) AS user_img
  FROM users AS u
  LEFT JOIN images AS i
    ON u.image_id = i.image_id
  LEFT JOIN cities AS ci
    ON u.city_id = ci.city_id
  LEFT JOIN countries AS co
    ON ci.country_id = co.country_id
  WHERE u.user_id = ?
  `

  db.query(q, [userID], (err, data) => {
    if (err) return res.status(500).json(err)

    const {hash, ...user} = data[0]

    return res.status(200).json(user)
  })
}


export const updateUser = (req, res) => {
  const token = req.cookies.accessToken

  if (!token) return res.status(401).json("Not Authorized")

  jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
    if (err) return res.status(403).json("Token is not valid")

    const q = `
      UPDATE users
      SET 
        firstname = ?
        ,middlename = ?
        ,lastname = ?
        ,gender = ?
        ,email = ?
        ,username = ?
      WHERE user_id = ?
    `  
    db.query(q, [     
      req.body.firstname
      ,req.body.middlename
      ,req.body.lastname
      ,req.body.gender
      ,req.body.email
      ,req.body.username
      ,user.id
    ], (err, data) => {
      if (err) return res.status(500).json(err)
      if (data.affectedRows > 0) return res.status(200).json('User updated')

      return res.status(403).json('You can update only your account')
    })
  })
}