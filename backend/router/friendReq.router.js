import { Router  } from "express";
import { verifyToken } from "../helpers/authMiddleware.helper.js";
import frendReq from "../controllers/friendRequest.controller.js";

const router = Router();

// router.post('/sendReq', verifyToken, frendReq.sendRequest);
router.post('/sendReq', frendReq.sendRequest);
router.get('/showReq', frendReq.showReqToUser);


export default router;
