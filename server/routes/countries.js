import express from "express"
import { getCountry
} from "../controllers/country.js"

const router = express.Router()

router.get("/", getCountry)


export default router