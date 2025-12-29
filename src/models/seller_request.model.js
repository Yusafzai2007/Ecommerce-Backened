import mongoose from "mongoose";

const sellerSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    shop_name: {
      type: String,
      required: true,
    },
    shop_description: {
      type: String,
      required: true,
    },
    shop_category: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "approaved", "rejected"],
      default: "pending",
    },
    shop_Img: {
      type: String,
      required: true,
    },
    created_at: {
      type: Date,
      default: Date.now(),
    },
  },
  { timestamps: true }
);

export const seller_request = mongoose.model("seller_request", sellerSchema);
