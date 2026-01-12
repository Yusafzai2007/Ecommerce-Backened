import { Router } from "express";

import { jwtverify } from "../middlewares/auth.middleware.js";
import {
  create_stock,
  delete_stock,
  edit_stock,
} from "../controllers/add_stock.controller.js";

const route = Router();

route.post("/add_stock/:id", jwtverify, create_stock);

route.put("/edit_stock/:id", jwtverify, edit_stock);

route.delete("/delete_stock/:id", jwtverify, delete_stock);

export default route;
