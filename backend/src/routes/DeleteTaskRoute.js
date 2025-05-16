import express from "express"
import { DeleteTaskCon } from "../controllers/DeleteTaskCont.js"

const router = express.Router()

router.route("/").post(DeleteTaskCon)

export default router