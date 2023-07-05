import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    products: [],
    payment: {},
    buyer: {
      type: String,
    },
    status: {
      type: String,
      default: "Not Process",
      enum: ["Not Process", "Processing", "Shipped", "Deliverd", "cancel"],
    },
  },
  { timeseries: true }
);

export default mongoose.model("orders", orderSchema);
