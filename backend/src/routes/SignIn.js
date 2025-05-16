import { SignInController } from '../controllers/SignInCon.js';
import express from 'express'


const router = express.Router()

router.route('/').post(SignInController)

export default router;