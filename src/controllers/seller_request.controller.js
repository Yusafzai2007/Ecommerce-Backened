import { asynhandler } from "../utils/asynchandler.js";
import { apiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";
import { seller_request } from "../models/seller_request.model.js";
import { cloudinaryimg } from "../utils/cloudinary.js";

const createshop = asynhandler(async (req, res) => {
  const { shop_name, shop_description, shop_category, phone, city, status } =
    req.body;

  if (!shop_name || !shop_description || !shop_category || !phone || !city) {
    throw new apiError(400, "All fields are required");
  }

  const existingShop = await seller_request.findOne({ shop_name });
  if (existingShop) {
    throw new apiError(400, "Shop name already exists");
  }

  if (!req.files || !req.files.shop_Img) {
    throw new apiError(400, "Shop image is required");
  }

  const localImg = req.files.shop_Img[0].path;

  const uploadImg = await cloudinaryimg(localImg);
  if (!uploadImg) {
    throw new apiError(500, "Image upload failed");
  }

  const shopRequest = await seller_request.create({
    shop_name,
    shop_description,
    shop_category,
    phone,
    city,
    status: status || "pending",
    shop_Img: uploadImg.url,
    userId: req.user._id,
  });

  if (!shopRequest) {
    throw new apiError(500, "Server error");
  }

  res
    .status(201)
    .json(
      new apiResponse(true, shopRequest, null, "Shop created successfully")
    );
});

const updateshop = asynhandler(async (req, res) => {
  const { id } = req.params;

  const { shop_name, shop_description, shop_category, phone, city, status } =
    req.body;

  let shop_Img;

  if (req.files && req.files.shop_Img) {
    shop_Img = await cloudinaryimg(req.files.shop_Img[0].path);
  }

  const updateData = {
    shop_name,
    shop_description,
    shop_category,
    phone,
    city,
    status,
  };

  if (shop_Img) {
    updateData.shop_Img = shop_Img;
  }

  const shopRequest = await seller_request.findByIdAndUpdate(id, updateData, {
    new: true,
  });

  if (!shopRequest) {
    throw new apiError(404, "Shop not found");
  }

  res.status(200).json({
    success: true,
    message: "Shop updated successfully",
    shop: shopRequest,
  });
});

export { createshop, updateshop };
