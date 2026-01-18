import { Router } from "express";
import { fetchMessages } from "../service/messages.controller.js";
import { verifyToken } from "../helpers/authMiddleware.helper.js"; 
const router = Router();

router.get('/getmessages/:otherUserId', verifyToken, fetchMessages)

export default router;