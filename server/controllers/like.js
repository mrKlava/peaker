import { db } from "../connect.js"
import jwt from "jsonwebtoken"


/* Get list of users who liked post */

export const getLikes = (req, res) => {
  const token = req.cookies.accessToken
  if (!token) return res.status(401).json("Not Authorized")

  jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
    if (err) return res.status(403).json("Token is not valid")

    const q = `
    SELECT user_id
    FROM post_likes
    WHERE post_id = ?
    `  
    db.query(q, [req.query.postID], (err, data) => {
      if (err) return res.status(500).json(err)
      
      return res.status(200).json(data.map(user => user.user_id))
    })
  })
}


/* Like post */

export const addLike = (req, res) => {
  const token = req.cookies.accessToken
  if (!token) return res.status(401).json("Not Authorized")

  jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
    if (err) return res.status(403).json("Token is not valid")
    
    const q = `
    INSERT INTO post_likes (post_id, user_id)
    VALUES (?)
    `
    
    const params = [
      req.body.postID,
      user.id
    ]
    console.log(params)

    db.query(q, [params], (err, data) => {
      if (err) return res.status(500).json('test')

      return res.status(200).json('Post has been liked')
    })
  })
}


/* Un-Like post */

export const deleteLike = (req, res) => {
  const token = req.cookies.accessToken
  if (!token) return res.status(401).json("Not Authorized")

  jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
    if (err) return res.status(403).json("Token is not valid")
    
    const q = `
    DELETE FROM post_likes
    WHERE post_id = ?
      AND user_id = ?
    `

    db.query(q, [req.query.postID, user.id], (err, data) => {
      if (err) return res.status(500).json(err)

      return res.status(200).json('Post has been un-liked')
    })
  })
}