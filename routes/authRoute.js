import express from "express";
const router = express.Router();

import {
  registerController,
  loginController,
  forgotPasswordController,
  updateUserProfileController,
  getAllOrdersController,
  getBuyerController,
  orderStatuschangeController,
} from "../controllers/authController.js";
import { requireSignIn, isAdmin } from "../middlewares/authMiddleware.js";
//routing
// register route
router.post("/register", registerController);

//login route
router.post("/login", loginController);

//forgot password route
router.post("/forgot-password", forgotPasswordController);

//Update Profile
router.put("/update-profile/:id", updateUserProfileController);

//protected User route auth
router.get("/user-auth", requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});

//protected Admin route auth
router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});

//get all orders
router.get("/orders", getAllOrdersController);

//find buyer
router.get("/buyer/:id", getBuyerController);

//handle order status change
router.put(
  "/change-ordre-status/:orderId",
  requireSignIn,
  isAdmin,
  orderStatuschangeController
);

export default router;
