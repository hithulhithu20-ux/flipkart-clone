// import express from "express";

// import {
//   getProducts,
//   getProduct,
//   createProduct,
//   updateProduct,
//   deleteProduct,
// } from "../controllers/productController.js";

// import protect from "../middleware/authMiddleware.js";
// import adminOnly from "../middleware/adminMiddleware.js";
// import upload from "../middleware/upload.js";

// const router = express.Router();

// // Public
// router.get("/", getProducts);
// router.get("/:id", getProduct);

// // Admin
// router.post("/",protect,adminOnly,upload.array("images",5),createProduct);
// router.put("/:id", protect, adminOnly, updateProduct);
// router.delete("/:id", protect, adminOnly, deleteProduct);

// export default router;

import express from "express";

import {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";

import protect from "../middleware/authMiddleware.js";
import adminOnly from "../middleware/adminMiddleware.js";
import upload from "../middleware/upload.js";

const router = express.Router();

router.get("/", getProducts);

router.get("/:id", getProduct);

router.post(
  "/",
  protect,
  adminOnly,
  upload.array("images", 5),
  createProduct
);

router.put(
  "/:id",
  protect,
  adminOnly,
  upload.array("images", 5),
  updateProduct
);

router.delete("/:id", protect, adminOnly, deleteProduct);

export default router;