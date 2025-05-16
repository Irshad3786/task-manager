import express from 'express';
import { Taskadd } from '../controllers/TaskCon.js';

const router = express.Router()

router.route('/').post(Taskadd)



export default router;