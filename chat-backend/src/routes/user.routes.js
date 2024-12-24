import { Router } from "express";
import { registerUser } from "../controllers/user.controller.js";
import { upload } from "../../../../LACTURE2_MERN/src/middlewares/multer.middleware.js";


// Creating an instance of Router

const router = Router();

// Route to handle user registeration

router.route("/register").post(
    upload.fields([
        {
            name: "avatar",
            maxCount: 1,
        },
        {
            name: "coverImage",
            maxCount: 1,
        },
    ]), 
    registerUser
);


export default router;