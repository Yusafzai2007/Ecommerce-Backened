import { Router } from "express";
import { upload } from "../middlewares/multer.midlleware.js";
import { jwtverify } from "../middlewares/auth.middleware.js";
import {
  createshop,
  currentuser,
  deleteshop,
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

route.get("/currentuser-seller-route", jwtverify, currentuser);





route.delete("/delete-seller-request/:id",deleteshop)










export default route;
