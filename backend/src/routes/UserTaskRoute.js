import express from "express";

import { AddProject } from "../controllers/UserTaskCon.js"

const router = express.Router()


router.route("/").post(AddProject)

export default router