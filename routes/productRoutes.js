import express from "express";
import {
  createProductController,
  deleteProductController,
  updateProductController,
  getAllProductsController,
  getSingleProductsController,
  getBraintreeTokenController,
  getBraintreePaymentController,
  getSimilarProductsController,
  getAdminAllProductsController,
} from "../controllers/productController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
const router = express.Router();

//create product route
router.post("/create-product", requireSignIn, isAdmin, createProductController);

//update category routes
router.put(
  "/update-product/:id",
  requireSignIn,
  isAdmin,
  updateProductController
);

//delete product route
router.delete(
  "/delete-product/:id",
  requireSignIn,
  isAdmin,
  deleteProductController
);

//get all created products for admin
router.get("/admin/get-all-products", getAdminAllProductsController);

//get all products routes
router.get("/get-all-products", getAllProductsController);

//get single product
router.get("/single-product/:id", getSingleProductsController);

//get similar prodcts
router.get("/similar-products/:category", getSimilarProductsController);

// Payment Routes
//Generate a Client braintree token
router.get("/braintree/token", getBraintreeTokenController);

// Payment
router.post("/braintree/payment", getBraintreePaymentController);

export default router;
