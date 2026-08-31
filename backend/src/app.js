import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();
const allowedOrigins = (process.env.CORS_ORIGIN || "").split(",");
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
    credentials: true,
    allowedHeaders: ["Content-type", "Authorization"],
  })
);
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

//routes
import userRouter from "./routes/user.routes.js";
import otpRouter from "./routes/otp.routes.js";
import authRouter from "./routes/auth.routes.js";
import productRouter from "./routes/product.routes.js";
import collectionRouter from "./routes/collection.routes.js";
import orderRouter from "./routes/order.routes.js";
import reviewRouter from "./routes/review.routes.js";
import errorHandler from "./middlewares/errorHandler.middleware.js";
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/otp", otpRouter);
app.use("/api/v1/shop", productRouter);
app.use("/api/v1/collections", collectionRouter);
app.use("/api/v1/order", orderRouter);
app.use("/api/v1/reviews", reviewRouter);
app.use(errorHandler);
export { app };
