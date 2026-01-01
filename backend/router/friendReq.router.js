import { Router  } from "express";
import { verifyToken } from "../helpers/authMiddleware.helper.js";
import frendReq from "../controllers/friendRequest.controller.js";

const router = Router();

router.get('/searchUser', verifyToken, frendReq.searchFriends);
router.post('/sendReq', verifyToken, frendReq.sendRequest);
router.get('/showReq', frendReq.showReqToUser);
router.patch('/acceptreq', frendReq.acceptReq);
router.patch('/rejectreq', frendReq.rejectReq);


export default router;
