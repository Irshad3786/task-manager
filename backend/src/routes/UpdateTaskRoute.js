import express from "express";

import { UpdateTask } from "../controllers/UpdateTaskCon.js";

const router = express.Router()


router.route("/").post(UpdateTask)

export default router