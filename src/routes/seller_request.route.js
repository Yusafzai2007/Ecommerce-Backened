import { Router } from "express";
import { upload } from "../middlewares/multer.midlleware.js";
import { jwtverify } from "../middlewares/auth.middleware.js";
import {
  createshop,
  updateshop,
} from "../controllers/seller_request.controller.js";

const route = Router();

route.post(
  "/seller-request",
  jwtverify,
  upload.fields([
    {
      name: "shop_Img",
      maxCount: 1,
    },
  ]),
  createshop
);

route.post(
  "/update-shop/:id",
  jwtverify,
  upload.fields([
    {
      name: "shop_Img",
      maxCount: 1,
    },
  ]),
  updateshop
);

export default route;
