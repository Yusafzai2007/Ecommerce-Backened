import { Router } from "express";

import { upload } from "../middlewares/multer.midlleware.js";
import { jwtverify } from "../middlewares/auth.middleware.js";
import {
  all_product,
  create_product,
  delete_product,
  get_product,
  update_product,
} from "../controllers/product.controller.js";

const route = Router();

route.post(
  "/create_product",
  jwtverify,
  upload.fields([
    {
      name: "Product_Img",
      maxCount: 3,
    },
  ]),
  create_product
);

route.post(
  "/update_product/:id",
  jwtverify,
  upload.fields([
    {
      name: "Product_Img",
      maxCount: 3,
    },
  ]),
  update_product
);

route.delete("/delete_product/:id", delete_product);

route.get("/current_user_products", jwtverify, get_product);

route.get("/all_products", all_product);

export default route;
