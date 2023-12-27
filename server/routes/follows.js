import express from "express"
import { getFollowing
        ,getFollowers
        ,addFollow 
        ,deleteFollow
} from "../controllers/follow.js"

const router = express.Router()

router.get("/", getFollowing)
router.get("/ers", getFollowers)
router.post("/", addFollow)
router.delete("/", deleteFollow)

export default router