import express from "express"
import { getCities
        ,getCitiesByCountry
} from "../controllers/city.js"

const router = express.Router()

router.get("/", getCities)
router.get("/country", getCitiesByCountry)


export default router