import { Router } from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
} from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

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
  (req, res, next) => {
    console.log("Incoming registration request:", req.body);
    console.log("Uploaded files:", req.files);
    next();
  },
  registerUser
);

router.route("/login").post(loginUser);
router.route("/logout").post(verifyJWT, logoutUser);
router.route("/refresh-token").post(refreshAccessToken);
router.route("/searchUser").get(verifyJWT, searchUser);
router.route("/getUserById").get(verifyJWT, getUserById);
router.route("updateAccountDetails").patch(verifyJWT, updateAccountDetails);
router.route("updateUserAvatar").patch(verifyJWT, updateAvatar);
router.route("updateUserCoverImage").patch(verifyJWT, updateCoverImage);



export default router;