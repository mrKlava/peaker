import { db } from "../connect.js"
import moment from "moment"
import jwt from "jsonwebtoken"


/* Get ll comments for a post by post_id */

export const getComments = (req, res) => {
  const token = req.cookies.accessToken
  if (!token) return res.status(401).json("Not Authorized")

  const q = `
  SELECT *
  FROM vw_comments
  WHERE post_id = ?
  `

  db.query(q, [req.query.postID], (err, data) => {
    if (err) return res.status(500).json(err)

    return res.status(200).json(data)
  })
}


/* Create new comment  */

export const addComment = (req, res) => {
  const token = req.cookies.accessToken
  if (!token) return res.status(401).json("Not Authorized")

  jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
    if (err) return res.status(403).json("Token is not valid")
    if (!req.body.text) return res.status(400).json("Comment can not be empty!") 

    // create new comment 
    const q = `
    INSERT INTO comments (text, user_id, created)
    VALUES (?)
    `

    const params = [
      req.body.text,
      user.id,
      moment(Date.now()).format("YYYY-MM-DD HH:mm:ss")
    ]

    db.query(q, [params], (err, comment) => {
      if (err) return res.status(500).json(err)

      // link created comment to post
      const commentID = comment.insertId

      const q = `
      INSERT INTO post_comments (post_id, comment_id)
      VALUES (?)
      `

      const params = [
        req.body.postId,
        commentID
      ]

      db.query(q, [params], (err, data) => {
        if (err) return res.status(500).json(err)

        return res.status(200).json("Comment created")
      })
    })
  })
}