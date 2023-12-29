import 'dotenv/config'
import express from "express"
import cors from "cors"
import cookieParser from 'cookie-parser'
import multer from 'multer'

import uploadRoutes from "./routes/upload.js"
import authRoutes from "./routes/auth.js"
import userRoutes from "./routes/users.js"
import postRoutes from "./routes/posts.js"
import likeRoutes from "./routes/likes.js"
import commentRoutes from "./routes/comments.js"
import followRoutes from "./routes/follows.js"
import countryRoutes from "./routes/countries.js"
import cityRoutes from "./routes/cities.js"


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

app.post("/api/upload/post-image", upload.single("file"), (req, res) => {
  const file = req.file

  res.status(200).json(file.filename)
})


/* Routing */

// app.use("/api/upload",  uploadRoutes)
app.use("/api/auth",        authRoutes)
app.use("/api/users",       userRoutes)
app.use("/api/posts",       postRoutes)
app.use("/api/likes",       likeRoutes)
app.use("/api/comments",    commentRoutes)
app.use("/api/follow",      followRoutes)
app.use("/api/countries",   countryRoutes)
app.use("/api/cities",      cityRoutes)


/* Run server */

app.listen(PORT, () => {
  console.log(`Server turning on ${PORT}`)
})