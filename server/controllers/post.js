import moment from "moment"
import { db } from "../connect.js"
import jwt from "jsonwebtoken"


export const getPosts = (req, res) => {
  const token = req.cookies.accessToken

  if (!token) return res.status(401).json("Not Authorized")

  jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
    if (err) return res.status(403).json("Token is not valid")

    const q = `
    SELECT DISTINCT p.*
          ,u.firstname
          ,u.lastname
          ,i.path AS author_img
      FROM posts AS p
      LEFT JOIN users AS u
        ON p.user_id = u.user_id
      LEFT JOIN images AS i
        ON u.image_id = i.image_id
      JOIN following AS f
        ON p.user_id = f.following_user_id
    WHERE f.user_id = ?
      OR p.user_id = ?
    ORDER BY p.created DESC
    `  
    db.query(q, [user.id, user.id], (err, data) => {
      if (err) return res.status(500).json(err)
      
      return res.status(200).json(data)
    })
  })

}


export const getUserPosts = (req, res) => {
    const q = `
  SELECT p.*
        ,u.firstname
        ,u.lastname
        ,i.path AS author_img
    FROM posts AS p
    LEFT JOIN  users AS u
      ON p.user_id = u.user_id
    LEFT JOIN  images AS i
      ON u.image_id = i.image_id
    WHERE p.user_id = ?
  `
  db.query(q, [req.body.user_id], (err, data) => {

  })

}


export const getPost = (req, res) => {
  res.send('test')
}


export const addPost = (req, res) => {
  const token = req.cookies.accessToken

  if (!token) return res.status(401).json("Not Authorized")

  jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
    if (err) return res.status(403).json("Token is not valid")
    
    const q = `
    INSERT INTO posts (text, user_id, created)
    VALUES ?
    `

    const params = [
      req.body.text,
      user.id,
      moment(Date.now()).format("YYYY-MM-DD HH:mm:ss")
    ]

    db.query(q, [[params]], (err, data) => {
      if (err) return res.status(500).json(err)

      return res.status(200).json("Post created")
    })
  })
}

