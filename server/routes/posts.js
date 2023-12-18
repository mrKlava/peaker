import express from "express"
import { getPost } from "../controllers/post.js"

const router = express.Router()

router.get("/find/:postID", getPost)

export default router