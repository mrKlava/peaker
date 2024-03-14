import express from "express"
import { getLocations
} from "../controllers/map.js"


const router = express.Router()

router.get("/locations",         getLocations)


export default router