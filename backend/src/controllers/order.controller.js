import mongoose from "mongoose";
import { Product } from "../models/product.model.js";
import { Order } from "../models/order.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import { calculateOrderPricing } from "../utils/pricing/calculateOrderPricing.js";
import { toCapitalize } from "../utils/capitalize.js";

const checkOut = asyncHandler(async (req, res) => {
  const { products, shippingAddress, paymentMethod, orderNotes, location } = req.body;

  if (!products || products.length === 0 || !shippingAddress || !paymentMethod) {
    throw new ApiError(400, "Order details fields are missing");
  }

  if (!["cod", "esewa"].includes(paymentMethod)) {
    throw new ApiError(400, "Invalid payment method");
  }

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

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const productIds = [...new Set(products.map((item) => item.productId.toString()))];

    const dbProducts = await Product.find({
      _id: { $in: productIds },
    })
      .select("_id price sizes totalStock")
      .session(session);

    if (dbProducts.length !== productIds.length) {
      throw new ApiError(404, "One or more products were not found");
    }

    const dbProductsMap = new Map(dbProducts.map((product) => [product._id.toString(), product]));

    const pricingProducts = [];

    for (const item of products) {
      const product = dbProductsMap.get(item.productId.toString());

      if (!product) {
        throw new ApiError(404, "Product not found");
      }

      const variant = product.sizes.find((size) => size.size === item.selectedSize);

      if (!variant) {
        throw new ApiError(400, `Size ${item.selectedSize} is not available for ${product._id}`);
      }

      if (variant.stock < item.quantity) {
        throw new ApiError(
          400,
          `Only ${variant.stock} items available for size ${item.selectedSize}`
        );
      }

      if (paymentMethod === "cod") {
        const updatedProduct = await Product.findOneAndUpdate(
          {
            _id: product._id,
            sizes: {
              $elemMatch: {
                size: item.selectedSize,
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
          throw new ApiError(400, `Insufficient stock for size ${item.selectedSize}`);
        }
      }

      pricingProducts.push({
        product: product._id,
        size: item.selectedSize,
        quantity: item.quantity,
        price: product.price,
      });
    }

    const { subtotal, shippingCharge, discount, totalAmount } = calculateOrderPricing({
      products: pricingProducts,
      shippingAddress,
    });

    const orderData = {
      user: req.user._id,
      products: pricingProducts,
      shippingAddress,
      subtotal,
      shippingCharge: shippingCharge || 0,
      discount: discount || 0,
      totalAmount,
      paymentMethod,
      orderNotes: orderNotes || "",
      location: location || {
        latitude: null,
        longitude: null,
      },
      paymentStatus: "pending",
      status: paymentMethod === "cod" ? "confirmed" : "pending",
    };

    const [order] = await Order.create([orderData], { session });

    await session.commitTransaction();

    return res.status(201).json(new ApiResponse(201, order, "Order Created Successfully"));
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    await session.endSession();
  }
});
const calculateCheckOutPricing = asyncHandler(async (req, res) => {
  const { products, shippingAddress, orderNotes, location } = req.body;
  if (!products || products.length === 0) {
    throw new ApiError(400, "Products are required");
  }
  if (!shippingAddress?.trim()) {
    throw new ApiError(400, "Shipping address is required");
  }
  const productsIds = [...new Set(products.map((item) => item.productId))];

  const dbProducts = await Product.find({ _id: { $in: productsIds } }).select("_id price ");

  if (dbProducts.length !== productsIds.length) {
    throw new ApiError(404, "One or more products not found");
  }
  const productMap = new Map(dbProducts.map((product) => [product?._id.toString(), product]));
  const orderProducts = products.map((item) => {
    const product = productMap.get(item.productId.toString());
    if (!product) {
      throw new ApiError(404, "Product not found");
    }

    const quantity = Number(item.quantity);

    if (!Number.isInteger(quantity) || quantity < 1) {
      throw new ApiError(400, "Invalid quantity");
    }

    return {
      product: product._id,
      name: product.name,
      price: product.price,
      quantity,
    };
  });

  const { subtotal, shippingCharge, discount, totalAmount } = calculateOrderPricing({
    products: orderProducts,
    shippingAddress,
  });
  return res.status(200).json(
    new ApiResponse(
      200,
      {
        subtotal,
        discount,
        shippingCharge,
        totalAmount,
        orderNotes,
        shippingAddress: toCapitalize(shippingAddress),
        location: location || { latitude: null, longitude: null },
      },
      "Checkout pricing calculated successfully"
    )
  );
});
const orderHistory = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user?._id }).sort({ createdAt: -1 });
  if (!orders) {
    throw new ApiError(404, "Orders not found or unauthorized");
  }
  return res.status(200).json(new ApiResponse(200, orders, "Order history fetched successfully"));
});
const orderSingleHistoryDetails = asyncHandler(async (req, res) => {
  const { orderId } = req.params;
  const order = await Order.findOne({
    _id: orderId,
    user: req.user._id,
  }).populate("products.product");
  if (!order) {
    throw new ApiError(404, "Order not found or unauthorized");
  }
  return res.status(200).json(new ApiResponse(200, order, "Order history fetched successfully"));
});

export { checkOut, orderHistory, orderSingleHistoryDetails, calculateCheckOutPricing };
