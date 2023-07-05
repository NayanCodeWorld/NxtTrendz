import JWT from "jsonwebtoken";

import userModel from "../models/userModel.js";
import orderModel from "../models/orderModel.js";

import { hashPassword, comparePassword } from "./../helpers/authHelper.js";

//register controller
export const registerController = async (req, res) => {
  try {
    const { name, email, password, phone, role, answer } = req.body;
    //validations
    if (!name) {
      return res.send({
        err: "Name must be provided",
      });
    }
    if (!email) {
      return res.send({
        err: "Email must be provided",
      });
    }
    if (!password) {
      return res.send({
        err: "Password must be provided",
      });
    }
    if (!phone) {
      return res.send({
        err: "Phone no must be provided",
      });
    }
    if (!answer) {
      return res.send({
        err: "Anser must be provided",
      });
    }

    // find user in database
    const exisitingUser = await userModel.findOne({ email });
    //check if user is already in database
    if (exisitingUser) {
      return res.status(200).send({
        success: false,
        message: "Already Registered please login",
      });
    }
    // if user is already in database then hashed password and save in database
    const hashedPassword = await hashPassword(password);
    //save in database
    const user = await new userModel({
      name,
      email,
      phone,
      role,
      password: hashedPassword,
      answer,
    }).save();
    //send response to user
    res.status(201).send({
      success: true,
      message: "User Register Successfully",
      // user,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      message: "Error in registeration",
      err,
    });
  }
};

//Login Controller
export const loginController = async (req, res) => {
  try {
    // retrieve data from body
    const { email, password } = req.body;

    //validate email and password is enter or not
    if (!email || !password) {
      return res.status(404).send({
        success: false,
        message: "Invalid email or password",
      });
    }
    // if email and password are present then fetch user data from database with the help of email
    const user = await userModel.findOne({ email });
    // then check user data is present or not if not present then return 404
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Email is not registerd",
      });
    }
    // if user data is present then commpaire password with database store password
    const match = await comparePassword(password, user.password);
    //if password is not match return 200
    if (!match) {
      return res.status(200).send({
        success: false,
        message: "Invalid Password",
      });
    }
    //if password is match then create jwt token and return it
    const token = JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.status(200).send({
      success: true,
      message: "login successfully",
      user: {
        _id: user._id,
        name: user.name,
        role: user.role,
        email: user.email,
        phone: user.phone,
        address: user.address,
      },
      jwt_token: token,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      message: "Error in login",
    });
  }
};

//forgot password controller
export const forgotPasswordController = async (req, res) => {
  try {
    //destructure email, password, secret answer from body
    const { email, answer, newPassword } = req.body;
    // validate all important parameters
    if (!email) {
      res.status(400).send({
        message: "Email is required",
      });
    }
    if (!answer) {
      res.status(400).send({
        message: "answer is required",
      });
    }
    if (!newPassword) {
      res.status(400).send({
        message: "New-Password is required",
      });
    }
    // check email and answer is present in database if present then query user object from database on bases of email and answer
    const user = await userModel.findOne({ email, answer });
    //if user is not present then return 404
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Wrong email or answer",
      });
    }
    // if user is present then hashed new password and update password in database with user object _id
    const hashed = await hashPassword(newPassword);
    await userModel.findByIdAndUpdate(user._id, { password: hashed });
    // retrun successfully reset password information
    res.status(200).send({
      success: true,
      message: "Password Reset Successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      message: "Something went wrong",
      error: err,
    });
  }
};

//Update Profile
export const updateUserProfileController = async (req, res) => {
  try {
    const { name, email, password, phone, answer, address } = req.body;
    const { id } = req.params;

    //find the user in database
    const user = await userModel.findById(id);
    //check password length
    if (password && password.length < 6) {
      return res.json({ error: "Passsword is required and 6 character long" });
    }
    const hashPassword = password ? hashPassword(password) : undefined;

    const updatedUser = await userModel.findByIdAndUpdate(
      id,
      {
        name: name || user.name,
        phone: phone || user.phone,
        email: email || user.email,
        address: address || user.address,
      },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "Profile updated successfully",
      updatedUser,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      message: "Something went wrong while updating user profile",
      err,
    });
  }
};

//find buyer
export const getBuyerController = async (req, res) => {
  try {
    const { id } = req.params;
    const buyer = await userModel.findById(id);
    res.status(200).send({
      success: true,
      message: "Buyer found successfully",
      buyer,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      message: "Something went wrong while fetching buyer",
    });
  }
};

// order Controller
export const getAllOrdersController = async (req, res) => {
  try {
    const orders = await orderModel.find({}).sort({ createdAt: "-1" });
    res.json(orders);
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      message: "Something went wrong while getting all orders",
      err,
    });
  }
};

// order status update
export const orderStatuschangeController = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;
    const order = await orderModel.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );
    res.json(order);
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      message: "Something went wrong while Updating order status",
      err,
    });
  }
};
