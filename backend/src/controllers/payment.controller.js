import { asyncHandler } from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import { Order } from "../models/order.model.js";
import { generateEsewaSignature } from "../utils/esewa.js";
import crypto from "crypto";
import axios from "axios";
const initiatePayment = asyncHandler(async (req, res) => {
  const { orderId } = req.body;
  if (!orderId) {
    throw new ApiError(400, "Order ID is required");
  }
  const order = await Order.findById(orderId);
  if (!order) {
    throw new ApiError(404, "Order not found");
  }
  if (order.paymentMethod !== "esewa") {
    throw new ApiError(400, "This order is not an eSewa payment");
  }

  if (order.paymentStatus === "paid") {
    throw new ApiError(400, "Order is already paid");
  }
  const transaction_uuid = `${Date.now()}-${crypto.randomBytes(4).toString("hex")}`;
  const product_code = process.env.ESEWA_PRODUCT_CODE;
  const total_amount = Number(order.totalAmount);
  order.transactionId = transaction_uuid;
  await order.save();

  const signed_field_names = "total_amount,transaction_uuid,product_code";
  const signature = generateEsewaSignature({
    total_amount,
    transaction_uuid,
    product_code,
  });
  const paymentData = {
    amount: total_amount,
    tax_amount: 0,
    total_amount,
    transaction_uuid,
    product_code,
    product_service_charge: 0,
    product_delivery_charge: 0,
    success_url: `${process.env.FRONTEND_URL}/payment/success`,
    failure_url: `${process.env.FRONTEND_URL}/payment/failure`,
    signed_field_names,
    signature,
  };
  return res.status(200).json(
    new ApiResponse(
      200,
      {
        paymentUrl: process.env.ESEWA_PAYMENT_URL,
        paymentData,
      },
      "eSewa payment initiated"
    )
  );
});
const verifyPayment = asyncHandler(async (req, res) => {
  const { orderId, transaction_uuid } = req.body;
  if (!orderId || !transaction_uuid) {
    throw new ApiError(400, "Order ID and transaction UUID are required");
  }
  const order = await Order.findById(orderId);

  if (order.paymentStatus === "paid") {
    return res.status(200).json(new ApiResponse(200, order, "Payment already verified"));
  }

  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const order = await Order.findById(orderId).session(session);
    if (!order) {
      throw new ApiError(404, "Order not found");
    }
    if (order.user.toString() !== req.user._id.toString()) {
      throw new ApiError(403, "Unauthorized access to order");
    }

    if (order.paymentMethod !== "esewa") {
      throw new ApiError(400, "This order is not an eSewa payment");
    }

    if (order.transactionId !== transaction_uuid) {
      throw new ApiError(400, "Invalid transaction UUID");
    }

    const response = await axios.get(process.env.ESEWA_STATUS_URL, {
      params: {
        product_code: process.env.ESEWA_PRODUCT_CODE,
        total_amount: order.totalAmount,
        transaction_uuid,
      },
    });

    const payment = response.data;

    if (payment.status !== "COMPLETE") {
      order.paymentStatus = "failed";
      await order.save({ session });
      await session.commitTransaction();
      throw new ApiError(400, `Payment verification failed: ${payment.status}`);
    }

    if (Number(payment.total_amount) !== Number(order.totalAmount)) {
      throw new ApiError(400, "Payment amount does not match order amount");
    }

    for (const item of order.products) {
      const updatedProduct = await Product.findOneAndUpdate(
        {
          _id: item.product,
          sizes: {
            $elemMatch: {
              size: item.size,
              stock: {
                $gte: item.quantity,
              },
            },
          },
        },
        {
          $inc: {
            "sizes.$.stock": -item.quantity,
            totalStock: -item.quantity,
            soldCount: item.quantity,
          },
        },
        {
          new: true,
          session,
        }
      );

      if (!updatedProduct) {
        throw new ApiError(400, `Insufficient stock for size ${item.size}`);
      }
    }

    order.paymentStatus = "paid";
    order.status = "confirmed";
    await order.save({ session });
    await session.commitTransaction();

    return res
      .status(200)
      .json(new ApiResponse(200, order, "Payment verified and order confirmed"));
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    await session.endSession();
  }
});

export { initiatePayment, verifyPayment };
