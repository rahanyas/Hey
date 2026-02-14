import express from 'express'
import { 
  sendOtp
} from "../controllers/otp.controller.js";

const router = express.Router();

router.post('/sendotp', sendOtp)

export default router;