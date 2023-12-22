import moment from "moment"
import { db } from "../connect.js"
import jwt from "jsonwebtoken"


export const getComments = (req, res) => {
  const q = `
  SELECT c.*
        ,u.user_id
        ,u.firstname
        ,u.lastname
        ,i.path AS author_img
    FROM comments AS c
    JOIN users AS u
      ON c.user_id = u.user_id
    LEFT JOIN images as i
    on u.image_id = i.image_id
    LEFT JOIN post_comments AS pc
      ON c.comment_id = pc.comment_id
  WHERE pc.post_id = ?
  ORDER BY c.created DESC
  `

  db.query(q, [req.query.postID], (err, data) => {
    if (err) return res.status(500).json(err)

    return res.status(200).json(data)
  })
}

export const addComment = (req, res) => {
  const token = req.cookies.accessToken

  if (!token) return res.status(401).json("Not Authorized")

  jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
    if (err) return res.status(403).json("Token is not valid")
    
    const q = `
    INSERT INTO comments (text, user_id, created)
    VALUES ?
    `

    const params = [
      req.body.text,
      user.id,
      moment(Date.now()).format("YYYY-MM-DD HH:mm:ss")
    ]

    db.query(q, [[params]], (err, data) => {
      if (err) return res.status(500).json(err)

      const commentID = data.insertId

      const q = `
      INSERT INTO post_comments (post_id, comment_id)
      VALUES ?
      `

      const params = [
        req.body.postId,
        commentID
      ]

      console.log(params)

      db.query(q, [[params]], (err, data) => {
        if (err) return res.status(500).json(err)



        return res.status(200).json("Comment created")
      })
    })
  })
}