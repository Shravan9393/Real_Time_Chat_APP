import { Router } from "express";
import { sendMessage, getMessages } from "../controllers/message.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

// Creating an instance of Router
const router = Router();

// Route to handle getting messages
router.route("/sendMessage").post(verifyJWT, sendMessage);
router.route("/getMessages/:chatId").get(verifyJWT, getMessages);


export default router;