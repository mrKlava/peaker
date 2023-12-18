import express from "express"
import { getLike } from "../controllers/like.js"

const router = express.Router()

router.get("/find/:likeID", getLike)

export default router