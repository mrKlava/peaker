import express from "express"
import { getPosts
        ,getUserPosts
        ,addPost, 
        deletePost
} from "../controllers/post.js"

const router = express.Router()

router.get("/", getPosts)
router.get("/user/:userID", getUserPosts)

router.post("/", addPost)

router.delete("/:postID", deletePost)

export default router