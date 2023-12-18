import 'dotenv/config'
import express from "express"
import cors from "cors"
import cookieParser from 'cookie-parser'

import authRoutes from "./routes/auth.js"
import userRoutes from "./routes/users.js"
import postRoutes from "./routes/posts.js"
import likeRoutes from "./routes/likes.js"
import commentRoutes from "./routes/comments.js"


/* Variables */

const PORT = process.env.PORT
const app = express()


/* Middleware */

app.use(express.json())
app.use(cors())
app.use(cookieParser())

/* Routing */

app.use("/api/auth", authRoutes)
app.use("/api/user", userRoutes)
app.use("/api/post", postRoutes)
app.use("/api/like", likeRoutes)
app.use("/api/comment", commentRoutes)


/* Run server */

app.listen(PORT, () => {
  console.log(`Server turning on ${PORT}`)
})