import mongoose from "mongoose";

const productschema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    brand_Name: {
      type: String,
      required: true,
    },
    model_name: {
      type: String,
      required: true,
    },
    product_price: {
      type: Number,
      required: true,
    },
    discount_percent: {
      type: String,
      required: true,
    },
    final_price: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
    delivery_time_day: {
      type: String,
      required: true,
    },
    Product_Img: {
      type: [String],
      required: true,
    },
    shop_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "seller_request",
      required: true,
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    created_at: {
      type: Date,
      default: Date.now(),
    },
  },
  { timestamps: true }
);

export const Product_model = mongoose.model("Product_model", productschema);
