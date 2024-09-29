import { registerUser } from "../controllers/AdminController.js";
import { isAdmin } from "../middleware/authMiddleware.js";

// Route to allow admin to register new users
router.post("/admin/register", isAdmin, registerUser);
