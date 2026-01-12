import mongoose from "mongoose";

const stockSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product_model",
      required: true,
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    currentStock: {
      type: Number,
      default: 0,
    },

    addedStock: {
      type: Number,
      default: 0,
    },

    previousStock: {
      type: Number,
      default: 0,
    },

    soldStock: {
      type: Number,
      default: 0,
    },

    stockAddedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

export const Stock_model = mongoose.model("Stock_model", stockSchema);
