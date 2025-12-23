import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadimages = async (localapth) => {
  try {
    if (!localapth) return null;

    const response = await cloudinary.uploader.upload(localapth);
    console.log(response);
    return response;
  } catch (error) {
    console.log(`cloudinary js error ${error}`);
  }
};

export { uploadimages };
