import { asynhandler } from "../utils/asynchandler.js";
import { apiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";
import { Product_model } from "../models/product.model.js";
import { Stock_model } from "../models/add_stock.model.js";

const create_stock = asynhandler(async (req, res) => {
  const { id: productId } = req.params;

  const { addedStock = 0, soldStock = 0 } = req.body;
  const userId = req.user._id;

  const product = await Product_model.findById(productId);

  if (!product) {
    throw new apiError(400, "product not found");
  }

  const laststock = await Stock_model.findOne({
    productId,
    user_id: userId,
  }).sort({ createdAt: -1 });

  const previousStock = laststock ? laststock.currentStock : 0;

  const currentStock = previousStock + Number(addedStock) - Number(soldStock);

  if (currentStock < 0) {
    throw new apiError(400, "Stock cannot be negative");
  }
  const stock = await Stock_model.create({
    productId,
    user_id: userId,
    previousStock,
    addedStock,
    soldStock,
    currentStock,
  });

  res.status(201).json(new apiResponse(201, stock, "Stock added successfully"));
});

const edit_stock = asynhandler(async (req, res) => {
  const { id } = req.params; // stock _id
  const { addedStock = 0, soldStock = 0 } = req.body;
  const userId = req.user._id;

  const stock = await Stock_model.findById(id);

  if (!stock) {
    throw new apiError(404, "Stock entry not found");
  }

  if (String(stock.user_id) !== String(userId)) {
    throw new apiError(403, "Unauthorized");
  }

  const previousStock = stock.previousStock;
  const currentStock = previousStock + Number(addedStock) - Number(soldStock);

  if (currentStock < 0) {
    throw new apiError(400, "Stock cannot be negative");
  }

  stock.addedStock = addedStock;
  stock.soldStock = soldStock;
  stock.currentStock = currentStock;

  await stock.save();

  res
    .status(200)
    .json(new apiResponse(200, stock, "Stock updated successfully"));
});

const delete_stock = asynhandler(async (req, res) => {
  const { id } = req.params;

  const deletedata = await Stock_model.findByIdAndDelete(id);

  if (!deletedata) {
    throw new apiError(404, "stock id is not required");
  }

  res.status(200).json(new apiResponse(200, "stock model successfully"));
});

export { create_stock, edit_stock, delete_stock };
