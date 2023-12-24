import express from "express"
import { getPosts
        ,getUserPosts
        ,addPost 
} from "../controllers/post.js"

const router = express.Router()

router.get("/", getPosts)
router.get("/user/:userID", getUserPosts)

router.post("/", addPost)

export default router