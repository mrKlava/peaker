import { db } from "../connect.js"
import jwt from "jsonwebtoken"
import multer from 'multer'


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, '../../client/public/assets/images')
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname)
  }
})

const upload = multer({ storage: storage })

// app.post("/api/upload", upload.single("file"), (req, res) => {
//   const file = req.file

//   res.status(200).json(file.filename)
// })


export const postImage = (upload.single("file"), (req, res) => {
  const token = req.cookies.accessToken

  if (!token) return res.status(401).json("Not Authorized")

  jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
    if (err) return res.status(403).json("Token is not valid")
    const file = req.body.file

    console.log(file)

    res.status(200).json(file.filename)
  })
})