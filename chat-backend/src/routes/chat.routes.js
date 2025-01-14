import { Router } from "express";
import {
  getChatAccess,
  getChatHistory,
  createGroup,
  addGroupMember,
  removegroupMember,
} from "../controllers/chat.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

// Creating an instance of Router
const router = Router();

router.route("/getChatAccess/:userId").get(verifyJWT, getChatAccess);
router.route("/getChatHistory").get(verifyJWT, getChatHistory);
router.route("/createGroup").post(verifyJWT, createGroup);
router.route("/addGroupMember").patch(verifyJWT, addGroupMember);
router.route("/removegroupMember").patch(verifyJWT, removegroupMember);

export default router;
