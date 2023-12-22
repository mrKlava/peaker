import express from "express"
import { getPost
  ,getPosts
  ,getUserPosts
  ,addPost 
} from "../controllers/post.js"

const router = express.Router()

router.get("/", getPosts)
router.get("/:user_id", getUserPosts)
router.get("/find/:postID", getPost)

router.post("/", addPost)

export default router