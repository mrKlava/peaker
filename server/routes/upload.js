import express from "express"
import { postImage 
} from "../controllers/upload.js"



const router = express.Router()

router.post("/post-image", postImage)

export default router