import express from 'express'
import { AllTasksControler } from '../controllers/AllTaskCon.js';

const router = express.Router()

router.route("/").post(AllTasksControler)

export default router;



