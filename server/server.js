import 'dotenv/config'
import express from "express"
import cors from "cors"
import cookieParser from 'cookie-parser'
import multer from 'multer'
import jwt from "jsonwebtoken"

import { db } from './connect.js'

import uploadRoutes from "./routes/upload.js"
import authRoutes from "./routes/auth.js"
import userRoutes from "./routes/users.js"
import postRoutes from "./routes/posts.js"
import likeRoutes from "./routes/likes.js"
import commentRoutes from "./routes/comments.js"
import followRoutes from "./routes/follows.js"
import countryRoutes from "./routes/countries.js"
import cityRoutes from "./routes/cities.js"
import moment from 'moment'



/* Variables */

const PORT = process.env.PORT
const app = express()


/* Middleware */

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", true)
  next()
})

app.use(cors({
  origin: "http://localhost:3000"
}))

app.use(express.json())
app.use(cookieParser())


/* handle upload - need to make proper controller */

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, '../client/public/assets/images')
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname)
  }
})

const upload = multer({ storage: storage })

app.post("/api/upload/image", upload.single("file"), (req, res) => {
  const token = req.cookies.accessToken

  if (!token) return res.status(401).json("Not Authorized")

  jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
    if (err) return res.status(403).json("Token is not valid")

    const file = req.file

    console.log(req.file)

    const q = `
      INSERT INTO images (path, user_id, uploaded)
      VALUES ?
      `
    const params = [
      file.filename,
      user.id,
      moment(Date.now()).format("YYYY-MM-DD HH:mm:ss")
    ]

    console.log(params)

    db.query(q, [[params]], (err, data) => {
      if (err) return res.status(500).json(err)

      console.log(data)

      return res.status(200).json(file.filename)
    })

  })
})


/* Routing */

// app.use("/api/upload",  uploadRoutes)
app.use("/api/auth", authRoutes)
app.use("/api/users", userRoutes)
app.use("/api/posts", postRoutes)
app.use("/api/likes", likeRoutes)
app.use("/api/comments", commentRoutes)
app.use("/api/follow", followRoutes)
app.use("/api/countries", countryRoutes)
app.use("/api/cities", cityRoutes)


/* Run server */

app.listen(PORT, () => {
  console.log(`Server turning on ${PORT}`)
})