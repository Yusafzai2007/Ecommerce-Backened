import express from "express";
import cookieParser from "cookie-parser";
const app = express();
import { apiError } from "./utils/apiError.js";
import cors from "cors";
import userroutes from "./routes/user.route.js";
import seller_request from "./routes/seller_request.route.js";
import product_route from "./routes/product.route.js";
import add_stock from "./routes/add_stock.route.js";

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(express.static("public"));
app.use(cookieParser());


app.use("/api/v1/ecommerce", userroutes);
app.use("/api/v1/ecommerce", seller_request);
app.use("/api/v1/ecommerce", product_route);
app.use("/api/v1/ecommerce", add_stock);

// ================= Error Handling =================
app.use((err, req, res, next) => {
  if (err instanceof apiError) {
    return res.status(err.statuscode).json({
      success: false,
      message: err.message,
      error: err.error || [],
    });
  }
  return res.status(500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

export default app;
