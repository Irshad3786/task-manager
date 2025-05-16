import express from 'express'
import { CreateAccountController } from '../controllers/CreateAccountCon.js'


const router = express.Router()

router.route('/').post(CreateAccountController)

export default router;