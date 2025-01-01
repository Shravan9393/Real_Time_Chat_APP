import { Router } from "express";
import { getChatHistory, saveMessage } from "../controllers/chat.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

// Creating an instance of Router
const router = Router();

// Route to handle getting chat history
router.route("/chat-history").get(verifyJWT, getChatHistory);

// Route to handle saving a message
router.route("/save-message").post(verifyJWT, saveMessage);

export default router;
