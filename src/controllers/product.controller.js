import { asynhandler } from "../utils/asynchandler.js";
import { apiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";
import { seller_request } from "../models/seller_request.model.js";
import { cloudinaryimg } from "../utils/cloudinary.js";
import { Product_model } from "../models/product.model.js";
import { Stock_model } from "../models/add_stock.model.js";

const create_product = asynhandler(async (req, res) => {
  const userId = req.user._id;
  const {
    title,
    description,
    brand_Name,
    model_name,
    product_price,
    discount_percent,
    final_price,
    color,
    delivery_time_day,
  } = req.body;

  if (
    !title ||
    !description ||
    !brand_Name ||
    !model_name ||
    !product_price ||
    !discount_percent ||
    !final_price ||
    !color ||
    !delivery_time_day
  ) {
    throw new apiError(400, "all fields are required");
  }

  const usershop = await seller_request.findOne({ userId: userId });
  if (!usershop) {
    throw new apiError(404, "shop not found");
  }

  const localImg = req.files?.Product_Img?.map((file) => file.path);
  if (!localImg || localImg.length === 0) {
    throw new apiError(400, "product images are required");
  }

  const uploadImgArr = [];
  for (const img of localImg) {
    const uploaded = await cloudinaryimg(img);
    if (!uploaded) {
      throw new apiError(500, "image upload failed");
    }
    uploadImgArr.push(uploaded.url);
  }

  const createproduct = await Product_model.create({
    title,
    description,
    brand_Name,
    model_name,
    product_price,
    discount_percent,
    final_price,
    color,
    delivery_time_day,
    Product_Img: uploadImgArr,
    shop_id: usershop._id,
    user_id: userId,
  });

  res
    .status(201)
    .json(new apiResponse(201, createproduct, "product created successfully"));
});

const update_product = asynhandler(async (req, res) => {
  const { id } = req.params;

  const {
    title,
    description,
    brand_Name,
    model_name,
    product_price,
    discount_percent,
    final_price,
    color,
    delivery_time_day,
  } = req.body;

  if (
    !title ||
    !description ||
    !brand_Name ||
    !model_name ||
    !product_price ||
    !discount_percent ||
    !final_price ||
    !color ||
    !delivery_time_day
  ) {
    throw new apiError(400, "all fields are required");
  }

  const localImg = req.files?.Product_Img.map((file) => file.path);

  if (!localImg) {
    throw new apiError(400, "local Img is required");
  }

  const updateImg = [];

  for (const Img of localImg) {
    const Imagesdata = await cloudinaryimg(Img);
    if (!Imagesdata) {
      throw new apiError(500, "server errror");
    }

    updateImg.push(Imagesdata.url);
  }

  const updatefiled = {
    title,
    description,
    brand_Name,
    model_name,
    product_price,
    discount_percent,
    final_price,
    color,
    delivery_time_day,
  };

  if (updateImg) {
    updatefiled.Product_Img = updateImg;
  }

  const updatedata = await Product_model.findByIdAndUpdate(
    id,
    {
      $set: updatefiled,
    },
    { new: true }
  );
  if (!updatedata) {
    throw new apiError(404, "product not found");
  }
  res
    .status(200)
    .json(new apiResponse(200, updatedata, "product updated successfully"));
});

const delete_product = asynhandler(async (req, res) => {
  const { id } = req.params;

  if (!id) {
    throw new apiError(400, "delete product id is required");
  }

  const deletedata = await Product_model.findByIdAndDelete(id);

  if (!deletedata) {
    throw new apiError(500, "server error");
  }

  await Stock_model.deleteMany({ productId: id });

  res.status(200).json(new apiResponse(200, "delete data successfully"));
});

const get_product = asynhandler(async (req, res) => {
  const userId = req.user._id;

  const products = await Product_model.find({ user_id: userId }).sort({
    createdAt: -1,
  });

  if (!products || products.length === 0) {
    throw new apiError(404, "No products found for this user");
  }

  res
    .status(200)
    .json(new apiResponse(200, products, "Products fetched successfully"));
});

const all_product = asynhandler(async (req, res) => {
  const products = await Product_model.find().sort({ createdAt: -1 });
  res.status(200).json(new apiResponse(200, products, "all products"));
});

export {
  create_product,
  update_product,
  delete_product,
  get_product,
  all_product,
};
