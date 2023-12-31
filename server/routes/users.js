import express from "express"
import { getUser
        ,getUsers
        ,getFilterUsers
        ,updateUser 
} from "../controllers/user.js"

const router = express.Router()

router.get("/", getUsers)
router.get("/filter", getFilterUsers)
router.get("/find/:userID", getUser)
router.put("/", updateUser)

export default router