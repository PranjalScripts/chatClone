import { Router } from "express";
import { registerUser } from "../controllers/AdminController.js";
import {
  getUserInfo,
  login,
  signup,
  logout,
  updateProfile,
  addProfileImage,
  removeProfileImage,
} from "../controllers/AuthController.js";
import { verifyToken,isAdmin } from "../middlewares/AuthMiddleware.js";
 
import multer from "multer";

const authRoutes = Router();
const upload = multer({ dest: "uploads/profiles/" });

authRoutes.post("/signup", signup);
authRoutes.post("/login", login);
authRoutes.post("/logout", logout);
authRoutes.get("/userinfo", verifyToken, getUserInfo);
authRoutes.post("/update-profile", verifyToken, updateProfile);
authRoutes.post(
  "/add-profile-image",
  verifyToken,
  upload.single("profile-image"),
  addProfileImage
);
authRoutes.delete("/remove-profile-image", verifyToken, removeProfileImage);




// Route to allow admin to register new users
authRoutes.post("/admin/register", isAdmin, registerUser);

export default authRoutes;
