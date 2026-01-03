import { Router } from "express";

import { upload } from "../middlewares/multer.midlleware.js";
import { jwtverify } from "../middlewares/auth.middleware.js";
import { create_product } from "../controllers/product.controller.js";

const route = Router();


route.post("/create_product",jwtverify,upload.fields([{
    name:"Product_Img",
    maxCount:3
}]),create_product)


export default route;
