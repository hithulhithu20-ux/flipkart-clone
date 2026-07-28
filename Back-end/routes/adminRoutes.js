import express from "express";
import protect from "../middleware/authMiddleware.js";
import adminOnly from "../middleware/adminMiddleware.js";

import { getAllUsers, getAllOrders, deleteUser, toggleBlockUser } from "../controllers/adminController.js";

const router = express.Router();

router.get("/users", protect, adminOnly, getAllUsers);
router.get("/orders", protect, adminOnly, getAllOrders);
router.delete("/users/:id", protect, adminOnly, deleteUser);

router.put("/users/:id/block", protect, adminOnly, toggleBlockUser);

export default router;