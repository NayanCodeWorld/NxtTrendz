import productModel from "../models/productModel.js";
import orderModel from "../models/orderModel.js";
import categoryModel from "../models/categoryModel.js";
import Joi from "joi";
import braintree from "braintree";
import dotenv from "dotenv";

dotenv.config();

//Create System for Payment Gateway
// 1. Create gateway => this creates a gateway instance using Node SDK
// 2. Generate a Client token => pass clientToken to your front-end
// 3. Receive a payment method nonce from your client
// 4. Create a transaction
const gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: process.env.BRAINTREE_MERCHANT_ID,
  publicKey: process.env.BRAINTREE_PUBLIC_KEY,
  privateKey: process.env.BRAINTREE_PRIVATE_KEY,
});

//create product controller
export const createProductController = async (req, res) => {
  try {
    const {
      title,
      brand,
      price,
      image_url,
      rating,
      description,
      category,
      availability,
    } = req.body;
    // validate content
    const productValidation = Joi.object({
      title: Joi.string().required(),
      brand: Joi.string().required(),
      price: Joi.number().required(),
      image_url: Joi.string().required(),
      rating: Joi.string().required(),
      category: Joi.string().required(),
      description: Joi.string().required(),
      availability: Joi.number().required(),
    });
    const { error } = productValidation.validate(req.body);
    if (error) {
      res.status(404).send({ message: error.message });
    }
    // check existing product status
    const existingProduct = await productModel.findOne({ title: req.title });
    if (existingProduct) {
      return res.status(200).send({
        success: false,
        message: "Product already exists",
      });
    }
    const product = await new productModel({
      title,
      brand,
      price,
      image_url,
      rating,
      category,
      description,
      availability,
    }).save();
    res.status(201).send({
      success: true,
      message: "new product created successfully",
      product,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send({
      success: false,
      err,
      message: "Error in Porduct",
    });
  }
};

//update product controller
//find product by id then update and send status and success message
export const updateProductController = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      title,
      brand,
      price,
      image_url,
      rating,
      category,
      description,
      availability,
    } = req.body;
    // we don't need to validate
    const updateProduct = await productModel.findByIdAndUpdate(
      id,
      {
        title: title,
        brand: brand,
        price: price,
        image_url: image_url,
        rating: rating,
        category: category,
        description: description,
        availability: availability,
      },
      { new: true }
    );
    res.status(200).send({
      success: true,
      messsage: "Product Updated Successfully",
      updateProduct,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send({
      success: false,
      err,
      message: "Error While updating Product",
    });
  }
};

//delete product controller
export const deleteProductController = async (req, res) => {
  try {
    const { id } = req.params;
    await productModel.findByIdAndDelete(id);
    res.status(200).send({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while deleting product",
      error,
    });
  }
};

export const getAdminAllProductsController = async (req, res) => {
  try {
    const products = await productModel.find({});
    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while getting all products",
      error,
    });
  }
};

//Get all products from the database
export const getAllProductsController = async (req, res) => {
  try {
    // "http://localhost:3002/product/get-all-products?sort_by=${activeOptionId}&category=${activeCategoryId}&title_search=${searchInput}&rating=${activeRatingId}"
    const { sort_by, category, title_search, rating } = req.query;

    //Handle category filter
    let cat = [];
    const allCat = await categoryModel.find({});
    allCat.forEach((e) => cat.push(e.name));
    let cateQuery = category !== "" ? category : cat;

    //Handle Raing category
    let rat = [1, 2, 3, 4];
    let ratQuery = rating !== "" ? rating : rat;
    const products = await productModel
      .find({
        category: cateQuery,
      })
      .sort({ price: sort_by });
    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while getting all products",
      error,
    });
  }
};

//Get Single Product from database
export const getSingleProductsController = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await productModel.findOne({ _id: id });
    res.status(200).send({
      success: true,
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while getting all products",
      error,
    });
  }
};

//Similar products route
export const getSimilarProductsController = async (req, res) => {
  try {
    const { category } = req.params;
    const similarProduct = await productModel.find({ category }).limit(4);
    res.status(200).send({
      success: true,
      similarProduct,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error while getting similar products",
      success: false,
      error,
    });
  }
};

// Payment Gateway API
//Token
export const getBraintreeTokenController = async (req, res) => {
  try {
    gateway.clientToken.generate({}, (err, response) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.send(response);
      }
    });
  } catch (err) {
    console.log(err);
  }
};

//payment
export const getBraintreePaymentController = async (req, res) => {
  try {
    const { nonce, cart, id } = req.body;
    let total = 0;
    cart.map((i) => {
      total += i.price * i.quantity;
    });
    let newTransaction = gateway.transaction.sale(
      {
        amount: total,
        paymentMethodNonce: nonce,
        options: {
          submitForSettlement: true,
        },
      },
      async function (err, result) {
        if (result) {
          const order = await new orderModel({
            products: cart,
            payment: result,
            buyer: id,
          }).save();
          res.json({ ok: true });
        } else {
          res.status(500).send(err);
        }
      }
    );
  } catch (err) {
    console.log(err);
  }
};
