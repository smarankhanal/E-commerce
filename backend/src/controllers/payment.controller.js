// import { asyncHandler } from "../utils/asyncHandler.js";
// import ApiError from "../utils/ApiError.js";
// import ApiResponse from "../utils/ApiResponse.js";
// import { Order } from "../models/order.model.js";
// import { Product } from "../models/product.model.js";
// import { generateEsewaSignature } from "../utils/esewa.js";
// import { calculateOrderPricing } from "../utils/pricing/calculateOrderPricing.js";
// import crypto from "crypto";
// import axios from "axios";
// import mongoose from "mongoose";
// import { PaymentAttempt } from "../models/paymentAttempt.model.js";

// const initiatePayment = asyncHandler(async (req, res) => {
//   const { products, shippingAddress, paymentMethod, orderNotes, location } = req.body;

//   if (!products || products.length === 0 || !shippingAddress || !paymentMethod) {
//     throw new ApiError(400, "Order details fields are missing");
//   }

//   if (paymentMethod !== "esewa") {
//     throw new ApiError(400, "This endpoint is only for eSewa payments");
//   }

//   for (const item of products) {
//     if (!item.productId) {
//       throw new ApiError(400, "Invalid product details");
//     }

//     if (!item.selectedSize) {
//       throw new ApiError(400, "Product size is required");
//     }

//     if (!Number.isInteger(item.quantity) || item.quantity < 1 || item.quantity > 100) {
//       throw new ApiError(400, "Quantity must be a whole number between 1 and 100");
//     }
//   }

//   const session = await mongoose.startSession();

//   try {
//     session.startTransaction();
//     const productIds = [...new Set(products.map((item) => item.productId.toString()))];

//     const dbProducts = await Product.find({
//       _id: {
//         $in: productIds,
//       },
//     })
//       .select("_id price sizes totalStock")
//       .session(session);

//     if (dbProducts.length !== productIds.length) {
//       throw new ApiError(404, "One or more products were not found");
//     }

//     const dbProductsMap = new Map(dbProducts.map((product) => [product._id.toString(), product]));

//     const pricingProducts = [];

//     for (const item of products) {
//       const product = dbProductsMap.get(item.productId.toString());

//       if (!product) {
//         throw new ApiError(404, "Product not found");
//       }

//       const variant = product.sizes.find((size) => size.size === item.selectedSize);

//       if (!variant) {
//         throw new ApiError(400, `Size ${item.selectedSize} is not available`);
//       }

//       if (variant.stock < item.quantity) {
//         throw new ApiError(
//           400,
//           `Only ${variant.stock} items available for size ${item.selectedSize}`
//         );
//       }

//       pricingProducts.push({
//         product: product._id,
//         size: item.selectedSize,
//         quantity: item.quantity,
//         price: product.price,
//       });
//     }

//     const { subtotal, shippingCharge, discount, totalAmount } = calculateOrderPricing({
//       products: pricingProducts,
//       shippingAddress,
//     });

//     const transaction_uuid = `${Date.now()}-${crypto.randomBytes(4).toString("hex")}`;
//     const product_code = process.env.ESEWA_PRODUCT_CODE;
//     const total_amount = Number(totalAmount);
//     const paymentAttemptData = {
//       user: req.user._id,
//       products: pricingProducts,
//       shippingAddress,
//       subtotal,
//       shippingCharge: shippingCharge || 0,
//       discount: discount || 0,
//       totalAmount,
//       orderNotes: orderNotes || "",
//       location: location || {
//         latitude: null,
//         longitude: null,
//       },
//       paymentMethod: "esewa",
//       transactionId: transaction_uuid,
//       paymentStatus: "pending",
//       expiresAt: new Date(Date.now() + 10 * 60 * 1000),
//     };
//     const [paymentAttempt] = await PaymentAttempt.create([paymentAttemptData], {
//       session,
//     });

//     const signed_field_names = "total_amount,transaction_uuid,product_code";
//     const signature = generateEsewaSignature({
//       total_amount,
//       transaction_uuid,
//       product_code,
//     });

//     const paymentData = {
//       amount: total_amount,
//       tax_amount: 0,
//       total_amount,
//       transaction_uuid,
//       product_code,
//       product_service_charge: 0,
//       product_delivery_charge: 0,
//       success_url: `${process.env.FRONTEND_URL}/payment/success`,
//       failure_url: `${process.env.FRONTEND_URL}/payment/failure`,
//       signed_field_names,
//       signature,
//     };
//     await session.commitTransaction();
//     return res.status(200).json(
//       new ApiResponse(
//         200,
//         {
//           paymentUrl: process.env.ESEWA_PAYMENT_URL,
//           paymentData,
//           paymentAttemptId: paymentAttempt._id,
//         },
//         "eSewa payment initiated"
//       )
//     );
//   } catch (error) {
//     await session.abortTransaction();
//     throw error;
//   } finally {
//     await session.endSession();
//   }
// });

// const verifyPayment = asyncHandler(async (req, res) => {
//   const { paymentAttemptId, transaction_uuid } = req.body;

//   if (!paymentAttemptId || !transaction_uuid) {
//     throw new ApiError(400, "Payment attempt ID and transaction UUID are required");
//   }

//   const session = await mongoose.startSession();
//   try {
//     session.startTransaction();

//     const paymentAttempt = await PaymentAttempt.findById(paymentAttemptId).session(session);

//     if (!paymentAttempt) {
//       throw new ApiError(404, "Payment attempt not found");
//     }

//     if (paymentAttempt.user.toString() !== req.user._id.toString()) {
//       throw new ApiError(403, "Unauthorized access to payment attempt");
//     }

//     if (paymentAttempt.paymentStatus === "paid") {
//       if (paymentAttempt.orderId) {
//         const existingOrder = await Order.findById(paymentAttempt.orderId).session(session);

//         await session.commitTransaction();

//         return res
//           .status(200)
//           .json(new ApiResponse(200, existingOrder, "Payment already verified"));
//       }

//       throw new ApiError(409, "Payment has already been processed");
//     }
//     console.log();
//     if (paymentAttempt.transactionId !== transaction_uuid) {
//       throw new ApiError(400, "Invalid transaction UUID");
//     }

//     if (paymentAttempt.expiresAt && paymentAttempt.expiresAt < new Date()) {
//       paymentAttempt.paymentStatus = "expired";

//       await paymentAttempt.save({
//         session,
//       });

//       throw new ApiError(400, "Payment attempt has expired");
//     }

//     const response = await axios.get(process.env.ESEWA_STATUS_URL, {
//       params: {
//         product_code: process.env.ESEWA_PRODUCT_CODE,
//         total_amount: paymentAttempt.totalAmount,
//         transaction_uuid,
//       },

//       timeout: 10000,
//     });

//     const payment = response.data;

//     if (payment.status !== "COMPLETE") {
//       throw new ApiError(400, `Payment verification failed: ${payment.status}`);
//     }

//     if (payment.transaction_uuid !== transaction_uuid) {
//       throw new ApiError(400, "Payment transaction UUID does not match");
//     }

//     if (payment.product_code !== process.env.ESEWA_PRODUCT_CODE) {
//       throw new ApiError(400, "Payment product code does not match");
//     }
//     if (Number(payment.total_amount) !== Number(paymentAttempt.totalAmount)) {
//       throw new ApiError(400, "Payment amount does not match");
//     }

//     for (const item of paymentAttempt.products) {
//       const updatedProduct = await Product.findOneAndUpdate(
//         {
//           _id: item.product,

//           sizes: {
//             $elemMatch: {
//               size: item.size,
//               stock: {
//                 $gte: item.quantity,
//               },
//             },
//           },
//         },

//         {
//           $inc: {
//             "sizes.$.stock": -item.quantity,
//             totalStock: -item.quantity,
//             soldCount: item.quantity,
//           },
//         },

//         {
//           new: true,
//           session,
//         }
//       );

//       if (!updatedProduct) {
//         throw new ApiError(400, `Insufficient stock for size ${item.size}`);
//       }
//     }

//     const orderData = {
//       user: paymentAttempt.user,
//       products: paymentAttempt.products,
//       shippingAddress: paymentAttempt.shippingAddress,
//       subtotal: paymentAttempt.subtotal,
//       shippingCharge: paymentAttempt.shippingCharge || 0,
//       discount: paymentAttempt.discount || 0,
//       totalAmount: paymentAttempt.totalAmount,
//       paymentMethod: "esewa",
//       orderNotes: paymentAttempt.orderNotes || "",
//       location: paymentAttempt.location || {
//         latitude: null,
//         longitude: null,
//       },
//       paymentStatus: "paid",
//       status: "confirmed",
//       transactionId: paymentAttempt.transactionId,
//     };
//     const [order] = await Order.create([orderData], { session });
//     paymentAttempt.paymentStatus = "paid";
//     paymentAttempt.orderId = order._id;
//     await paymentAttempt.save({
//       session,
//     });
//     await session.commitTransaction();
//     return res
//       .status(200)
//       .json(new ApiResponse(200, order, "Payment verified and order created successfully"));
//   } catch (error) {
//     if (session.inTransaction()) {
//       await session.abortTransaction();
//     }

//     throw error;
//   } finally {
//     await session.endSession();
//   }
// });
// export { initiatePayment, verifyPayment };

import { asyncHandler } from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import { Order } from "../models/order.model.js";
import { Product } from "../models/product.model.js";
import { generateEsewaSignature } from "../utils/esewa.js";
import { calculateOrderPricing } from "../utils/pricing/calculateOrderPricing.js";
import crypto from "crypto";
import axios from "axios";
import mongoose from "mongoose";
import { PaymentAttempt } from "../models/paymentAttempt.model.js";

// ==========================================================================
// STEP 1 of the eSewa flow: called when the user clicks "Place Order" and
// chooses eSewa as the payment method. This does NOT create a real Order —
// it validates everything, reserves nothing yet, and creates a pending
// "PaymentAttempt" record. It then returns the data the frontend needs to
// build and submit a form to eSewa's payment page.
// ==========================================================================
const initiatePayment = asyncHandler(async (req, res) => {
  const { products, shippingAddress, paymentMethod, orderNotes, location } = req.body;

  // Basic presence checks on required top-level fields.
  if (!products || products.length === 0 || !shippingAddress || !paymentMethod) {
    throw new ApiError(400, "Order details fields are missing");
  }

  // This controller is dedicated to eSewa only — other payment methods
  // (e.g. COD) are handled by a separate endpoint/controller.
  if (paymentMethod !== "esewa") {
    throw new ApiError(400, "This endpoint is only for eSewa payments");
  }

  // Validate each line item's shape before touching the database.
  for (const item of products) {
    if (!item.productId) {
      throw new ApiError(400, "Invalid product details");
    }

    if (!item.selectedSize) {
      throw new ApiError(400, "Product size is required");
    }

    if (!Number.isInteger(item.quantity) || item.quantity < 1 || item.quantity > 100) {
      throw new ApiError(400, "Quantity must be a whole number between 1 and 100");
    }
  }

  // Use a Mongo transaction so the "check stock -> create PaymentAttempt"
  // sequence is atomic — we don't want to create a payment attempt based
  // on stock data that could change/be inconsistent mid-way.
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    // De-duplicate product IDs in case the same product appears multiple
    // times (e.g. same product, different sizes) to minimize DB lookups.
    const productIds = [...new Set(products.map((item) => item.productId.toString()))];

    const dbProducts = await Product.find({
      _id: {
        $in: productIds,
      },
    })
      .select("_id price sizes totalStock")
      .session(session);

    // If some requested product IDs don't exist in the DB, bail out —
    // this guards against stale/tampered client-side cart data.
    if (dbProducts.length !== productIds.length) {
      throw new ApiError(404, "One or more products were not found");
    }

    // Map for O(1) lookup of product docs by ID while iterating line items.
    const dbProductsMap = new Map(dbProducts.map((product) => [product._id.toString(), product]));

    const pricingProducts = [];

    for (const item of products) {
      const product = dbProductsMap.get(item.productId.toString());

      if (!product) {
        throw new ApiError(404, "Product not found");
      }

      // Confirm the requested size variant actually exists for this product.
      const variant = product.sizes.find((size) => size.size === item.selectedSize);

      if (!variant) {
        throw new ApiError(400, `Size ${item.selectedSize} is not available`);
      }

      // Confirm there's enough stock for the requested quantity.
      // Note: this is a check-only step here; actual stock deduction only
      // happens later in verifyPayment, once payment is confirmed.
      if (variant.stock < item.quantity) {
        throw new ApiError(
          400,
          `Only ${variant.stock} items available for size ${item.selectedSize}`
        );
      }

      // Build a trusted, server-side version of each line item using the
      // DB's price (never trust price from the client) for pricing calc.
      pricingProducts.push({
        product: product._id,
        size: item.selectedSize,
        quantity: item.quantity,
        price: product.price,
      });
    }

    // Compute subtotal, shipping, discount, and total server-side based
    // on trusted product data and shipping address (e.g. for tiered shipping).
    const { subtotal, shippingCharge, discount, totalAmount } = calculateOrderPricing({
      products: pricingProducts,
      shippingAddress,
    });

    // Generate a unique transaction ID for this specific payment attempt.
    // Combines a timestamp with random bytes to avoid collisions.
    const transaction_uuid = `${Date.now()}-${crypto.randomBytes(4).toString("hex")}`;
    const product_code = process.env.ESEWA_PRODUCT_CODE;
    const total_amount = Number(totalAmount);

    // Snapshot of everything needed to later create the real Order once
    // payment is verified. Stored now so nothing has to be recomputed
    // (and potentially drift, e.g. if prices change) after payment.
    const paymentAttemptData = {
      user: req.user._id,
      products: pricingProducts,
      shippingAddress,
      subtotal,
      shippingCharge: shippingCharge || 0,
      discount: discount || 0,
      totalAmount,
      orderNotes: orderNotes || "",
      location: location || {
        latitude: null,
        longitude: null,
      },
      paymentMethod: "esewa",
      transactionId: transaction_uuid,
      paymentStatus: "pending",
      // Payment attempt expires after 10 minutes if not completed,
      // preventing stale/abandoned attempts from being verified later.
      expiresAt: new Date(Date.now() + 10 * 60 * 1000),
    };
    const [paymentAttempt] = await PaymentAttempt.create([paymentAttemptData], {
      session,
    });

    // eSewa requires a signature (HMAC) over specific fields so it can
    // verify the request wasn't tampered with. signed_field_names tells
    // eSewa which fields were included in the signature, in what order.
    const signed_field_names = "total_amount,transaction_uuid,product_code";
    const signature = generateEsewaSignature({
      total_amount,
      transaction_uuid,
      product_code,
    });

    // All fields eSewa's payment form expects as POST data.
    const paymentData = {
      amount: total_amount,
      tax_amount: 0,
      total_amount,
      transaction_uuid,
      product_code,
      product_service_charge: 0,
      product_delivery_charge: 0,
      // eSewa redirects the user's browser to these URLs after payment,
      // where the frontend then calls verifyPayment.
      success_url: `${process.env.FRONTEND_URL}/payment/success`,
      failure_url: `${process.env.FRONTEND_URL}/payment/failure`,
      signed_field_names,
      signature,
    };

    await session.commitTransaction();

    // Return everything the frontend needs: where to POST the form (paymentUrl),
    // what fields to include (paymentData), and our own reference ID
    // (paymentAttemptId) to use later during verification.
    return res.status(200).json(
      new ApiResponse(
        200,
        {
          paymentUrl: process.env.ESEWA_PAYMENT_URL,
          paymentData,
          paymentAttemptId: paymentAttempt._id,
        },
        "eSewa payment initiated"
      )
    );
  } catch (error) {
    // Roll back the transaction on any failure so no partial PaymentAttempt
    // is left behind.
    await session.abortTransaction();
    throw error;
  } finally {
    await session.endSession();
  }
});

// ==========================================================================
// STEP 2 of the eSewa flow: called by the frontend after eSewa redirects
// the user back with a transaction_uuid. This verifies the payment really
// happened (server-to-server, with eSewa directly) before deducting stock
// and creating the actual Order. This is the source of truth — never trust
// the frontend's claim that payment succeeded.
// ==========================================================================
const verifyPayment = asyncHandler(async (req, res) => {
  const { paymentAttemptId, transaction_uuid } = req.body;

  if (!paymentAttemptId || !transaction_uuid) {
    throw new ApiError(400, "Payment attempt ID and transaction UUID are required");
  }

  // Transaction wraps: idempotency checks, expiry checks, external eSewa
  // verification, stock deduction, and Order creation — all atomic, so a
  // failure partway through doesn't leave stock decremented without an
  // Order, or an Order without decremented stock.
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    const paymentAttempt = await PaymentAttempt.findById(paymentAttemptId).session(session);

    if (!paymentAttempt) {
      throw new ApiError(404, "Payment attempt not found");
    }

    // Ensure the payment attempt actually belongs to the requesting user —
    // prevents one user from verifying/viewing another user's payment attempt.
    if (paymentAttempt.user.toString() !== req.user._id.toString()) {
      throw new ApiError(403, "Unauthorized access to payment attempt");
    }

    // Idempotency guard: if this attempt was already marked "paid" (e.g. the
    // frontend called verify twice, or the user refreshed the success page),
    // don't process payment/stock/order creation again — just return the
    // existing order.
    if (paymentAttempt.paymentStatus === "paid") {
      if (paymentAttempt.orderId) {
        const existingOrder = await Order.findById(paymentAttempt.orderId).session(session);

        await session.commitTransaction();

        return res
          .status(200)
          .json(new ApiResponse(200, existingOrder, "Payment already verified"));
      }

      // Marked paid but somehow has no linked order — an inconsistent/edge
      // state that shouldn't normally happen; treated as an error.
      throw new ApiError(409, "Payment has already been processed");
    }

    console.log(); // Note: this looks like leftover debug code with no effect — safe to remove.

    // Make sure the transaction_uuid the client is claiming matches what
    // we actually stored when the payment was initiated.
    if (paymentAttempt.transactionId !== transaction_uuid) {
      throw new ApiError(400, "Invalid transaction UUID");
    }

    // Reject verification attempts on payment attempts older than the
    // 10-minute window set in initiatePayment, marking it "expired" so
    // it can't be retried indefinitely.
    if (paymentAttempt.expiresAt && paymentAttempt.expiresAt < new Date()) {
      paymentAttempt.paymentStatus = "expired";

      await paymentAttempt.save({
        session,
      });

      throw new ApiError(400, "Payment attempt has expired");
    }

    // The critical trust step: ask eSewa's own status API directly
    // (server-to-server) whether this transaction actually completed,
    // rather than trusting anything passed from the frontend/URL params.
    const response = await axios.get(process.env.ESEWA_STATUS_URL, {
      params: {
        product_code: process.env.ESEWA_PRODUCT_CODE,
        total_amount: paymentAttempt.totalAmount,
        transaction_uuid,
      },
      timeout: 10000,
    });

    const payment = response.data;

    // eSewa must explicitly report the transaction as COMPLETE.
    if (payment.status !== "COMPLETE") {
      throw new ApiError(400, `Payment verification failed: ${payment.status}`);
    }

    // Cross-check every identifying/amount field eSewa returns against what
    // we expect, to guard against any mismatch, replay, or tampering.
    if (payment.transaction_uuid !== transaction_uuid) {
      throw new ApiError(400, "Payment transaction UUID does not match");
    }

    if (payment.product_code !== process.env.ESEWA_PRODUCT_CODE) {
      throw new ApiError(400, "Payment product code does not match");
    }

    if (Number(payment.total_amount) !== Number(paymentAttempt.totalAmount)) {
      throw new ApiError(400, "Payment amount does not match");
    }

    // Only now — after payment is confirmed genuine — do we actually
    // decrement stock. This is the "real" stock reservation point, done
    // atomically per item with a conditional update: it only succeeds if
    // there's still enough stock at this exact moment (protects against
    // race conditions from concurrent orders depleting stock in between
    // initiatePayment and verifyPayment).
    for (const item of paymentAttempt.products) {
      const updatedProduct = await Product.findOneAndUpdate(
        {
          _id: item.product,
          sizes: {
            $elemMatch: {
              size: item.size,
              stock: {
                $gte: item.quantity, // only matches if enough stock remains
              },
            },
          },
        },
        {
          $inc: {
            "sizes.$.stock": -item.quantity, // decrement stock for that specific size
            totalStock: -item.quantity, // decrement overall product stock
            soldCount: item.quantity, // track sales count
          },
        },
        {
          new: true,
          session,
        }
      );

      // If the conditional update matched nothing, stock ran out between
      // initiation and verification — abort the whole transaction so no
      // order is created and no other item's stock stays decremented.
      if (!updatedProduct) {
        throw new ApiError(400, `Insufficient stock for size ${item.size}`);
      }
    }

    // Build the real, permanent Order record from the trusted snapshot
    // stored in the PaymentAttempt (not from any client-supplied data).
    const orderData = {
      user: paymentAttempt.user,
      products: paymentAttempt.products,
      shippingAddress: paymentAttempt.shippingAddress,
      subtotal: paymentAttempt.subtotal,
      shippingCharge: paymentAttempt.shippingCharge || 0,
      discount: paymentAttempt.discount || 0,
      totalAmount: paymentAttempt.totalAmount,
      paymentMethod: "esewa",
      orderNotes: paymentAttempt.orderNotes || "",
      location: paymentAttempt.location || {
        latitude: null,
        longitude: null,
      },
      paymentStatus: "paid",
      status: "confirmed",
      transactionId: paymentAttempt.transactionId,
    };
    const [order] = await Order.create([orderData], { session });

    // Mark the payment attempt as paid and link it to the newly created
    // order, so future duplicate verify calls hit the idempotency branch above.
    paymentAttempt.paymentStatus = "paid";
    paymentAttempt.orderId = order._id;
    await paymentAttempt.save({
      session,
    });

    await session.commitTransaction();

    return res
      .status(200)
      .json(new ApiResponse(200, order, "Payment verified and order created successfully"));
  } catch (error) {
    // Roll back everything (stock decrements, order creation, status
    // updates) if any step failed, keeping the DB consistent.
    if (session.inTransaction()) {
      await session.abortTransaction();
    }

    throw error;
  } finally {
    await session.endSession();
  }
});

export { initiatePayment, verifyPayment };
