import express from 'express'
import { AllProjectControler } from '../controllers/AllProjectCon.js';

const router = express.Router()

router.route("/").post(AllProjectControler)

export default router;



