import 'dotenv/config'
import express from "express"
import cors from "cors"
import cookieParser from 'cookie-parser'
import multer from 'multer'
import jwt from "jsonwebtoken"
import moment from 'moment'

import { db } from './connect.js'

import authRoutes from "./routes/auth.js"
import userRoutes from "./routes/users.js"
import postRoutes from "./routes/posts.js"
import likeRoutes from "./routes/likes.js"
import commentRoutes from "./routes/comments.js"
import followRoutes from "./routes/follows.js"
import countryRoutes from "./routes/countries.js"
import cityRoutes from "./routes/cities.js"
import uploadRoutes from "./routes/upload.js"


/* Variables */

const PORT = process.env.PORT
const ORIGIN_CLIENT = process.env.ORIGIN_CLIENT

const app = express()


/* Middleware */

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", true)
  next()
})

app.use(cors({
  origin: ORIGIN_CLIENT
}))

app.use(express.json())
app.use(cookieParser())


/* Upload image - TESTING - need to make proper controller */

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // cb(null, '../blob/images')
    cb(null, "../client/public/assets/images")
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname)
  }
})

const upload = multer({ storage: storage })


/* Routing */

app.post("/api/upload/image", upload.single("file"), (req, res) => {
  const token = req.cookies.accessToken
  if (!token) return res.status(401).json("Not Authorized")

  jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
    if (err) return res.status(403).json("Token is not valid")

    const file = req.file

    if (file.type !== "image/jpeg") return res.status(422).json("File is not jpg") 
    if (((file.size / 1024) / 1024).toFixed(4) > 4) return res.status(413).json("File is larger that 4mb") 

    const q = `
    INSERT INTO images (path, user_id, uploaded)
    VALUES ?
    `
    
    const params = [
      file.filename,
      user.id,
      moment(Date.now()).format("YYYY-MM-DD HH:mm:ss")
    ]

    db.query(q, [[params]], (err, data) => {
      if (err) return res.status(500).json(err)

      return res.status(200).json(file.filename)
    })
  })
})

app.use("/api/auth",          authRoutes)
app.use("/api/users",         userRoutes)
app.use("/api/posts",         postRoutes)
app.use("/api/likes",         likeRoutes)
app.use("/api/comments",      commentRoutes)
app.use("/api/follow",        followRoutes)
app.use("/api/countries",     countryRoutes)
app.use("/api/cities",        cityRoutes)
// app.use("/api/upload",  uploadRoutes)


/* Run server */

app.listen(PORT, () => {
  console.log(`Server turning on ${PORT}`)
})