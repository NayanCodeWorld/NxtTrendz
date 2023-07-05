import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    answer: {
      type: String,
      required: true,
    },
    role: {
      type: Number,
      default: 0,
    },
    address: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

// Create a model of schema, this model work as data base instance
// const userModel = mongoose.model('users',userSchema);

// export default userModel

export default mongoose.model("users", userSchema);
