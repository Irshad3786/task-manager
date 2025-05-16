import express from 'express'
import { VerifyToken } from '../controllers/Veriication.js'

const router = express.Router()



router.route('/').get(VerifyToken)

export default router
