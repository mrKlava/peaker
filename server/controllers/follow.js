import { db } from "../connect.js"
import jwt from "jsonwebtoken"


/* Get Followed */

export const getFollowing = (req, res) => {
  const token = req.cookies.accessToken
  if (!token) return res.status(401).json("Not Authorized")

  jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
    if (err) return res.status(403).json("Token is not valid")

    const q = `
    SELECT following_user_id
    FROM following
    WHERE user_id = ?
    `  
    db.query(q, [req.query.userID], (err, data) => {
      if (err) return res.status(500).json(err)

      return res.status(200).json(data.map(user => user.following_user_id))
    })
  })
}


/* Get Followers */

export const getFollowers = (req, res) => {
  const token = req.cookies.accessToken

  if (!token) return res.status(401).json("Not Authorized")

  jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
    if (err) return res.status(403).json("Token is not valid")

    const q = `
    SELECT user_id
    FROM following
    WHERE following_user_id = ?
    `  
  
    db.query(q, [req.query.userID], (err, data) => {
      if (err) return res.status(500).json(err)

      return res.status(200).json(data.map(user => user.user_id))
    })
  })
}


/* Follow user */

export const addFollow = (req, res) => {
  const token = req.cookies.accessToken

  if (!token) return res.status(401).json("Not Authorized")

  jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
    if (err) return res.status(403).json("Token is not valid")
    
    const q = `
    INSERT INTO following (user_id, following_user_id)
    VALUES (?)
    `
    
    const params = [
      user.id,
      req.body.userID
    ]

    db.query(q, [params], (err, data) => {
      if (err) return res.status(500).json(err)

      return res.status(200).json('User have been followed')
    })
  })
}


/* Un-Follow user */

export const deleteFollow = (req, res) => {
  const token = req.cookies.accessToken

  if (!token) return res.status(401).json("Not Authorized")

  jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
    if (err) return res.status(403).json("Token is not valid")
    
    const q = `
    DELETE FROM following
    WHERE following_user_id = ?
      AND user_id = ?
    `

    db.query(q, [req.query.userID, user.id], (err, data) => {
      if (err) return res.status(500).json(err)

      return res.status(200).json('User have been un-followed')
    })
  })
}