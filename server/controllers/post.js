import { db } from "../connect.js"
import moment from "moment"
import jwt from "jsonwebtoken"


/* Get Feed posts */

export const getPosts = (req, res) => {
  const token = req.cookies.accessToken
  if (!token) return res.status(401).json("Not Authorized")

  jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
    if (err) return res.status(403).json("Token is not valid")

    const q = `
    SELECT DISTINCT p.*
          ,u.firstname
          ,u.lastname
          ,IF (i.image_id IS NULL, 'no-img.png', i.path) AS user_img
      FROM posts AS p
      LEFT JOIN users AS u
        ON p.user_id = u.user_id
      LEFT JOIN images AS i
        ON u.image_id = i.image_id
      LEFT JOIN following AS f
        ON p.user_id = f.following_user_id
    WHERE f.user_id = ?
      OR p.user_id = ?
    ORDER BY p.created DESC
    LIMIT ?, 10
    `  

    db.query(q, [user.id, user.id, parseInt(req.query.page) * 10], (err, data) => {
      if (err) return res.status(500).json(err)
      if (!data.length) return res.status(200).json('')

      return res.status(200).json(
        {
          data, 
          nextId: parseInt(req.query.page) + 1,
          previousId: parseInt(req.query.page) - 1
        }
      )
    })
  })
}


/* Get User posts */

export const getUserPosts = (req, res) => {
  const q = `
  SELECT p.*
        ,u.firstname
        ,u.lastname
        ,IF (i.image_id IS NULL, 'no-img.png', i.path) AS user_img
    FROM posts AS p
    LEFT JOIN  users AS u
      ON p.user_id = u.user_id
    LEFT JOIN  images AS i
      ON u.image_id = i.image_id
    WHERE p.user_id = ?
    ORDER BY p.created DESC
    LIMIT ?, 10
  `
  db.query(q, [req.params.userID, parseInt(req.query.page) * 10], (err, data) => {
    if (err) return res.status(500).json(err)
    if (!data.length) return res.status(200).json('')

    return res.status(200).json(
      {
        data, 
        nextId: parseInt(req.query.page) + 1,
        previousId: parseInt(req.query.page) - 1
      }
    )
  })
}


/* Create Post */

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


/* Delete Post */

export const deletePost = (req, res) => {
  const token = req.cookies.accessToken
  if (!token) return res.status(401).json("Not Authorized")

  jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
    if (err) return res.status(403).json("Token is not valid")
    
    const q = `
    DELETE FROM posts
    WHERE post_id = ?
      AND user_id = ?
    `

    db.query(q, [parseInt(req.params.postID), user.id], (err, data) => {
      if (err) return res.status(500).json(err)
      if (data.affectedRows > 0) return res.status(200).json('Post has been deleted')

      return res.status(403).json("Can not delete this post")
    })
  })
}

