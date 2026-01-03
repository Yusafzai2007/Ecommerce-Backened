import { asynhandler } from "../utils/asynchandler.js";
import { apiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";
import { seller_request } from "../models/seller_request.model.js";
import { cloudinaryimg } from "../utils/cloudinary.js";
import { Product_model } from "../models/product.model.js";

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

export { create_product };
