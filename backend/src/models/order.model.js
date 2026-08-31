// import mongoose, { Schema } from "mongoose";
// console.log("================================");
// console.log("LOADING MY ORDER MODEL");
// console.log("FILE:", import.meta.url);
// console.log("================================");
// const orderSchema = new Schema(
//   {
//     user: {
//       type: Schema.Types.ObjectId,
//       ref: "User",
//       required: true,
//     },
//     products: [
//       {
//         product: {
//           type: Schema.Types.ObjectId,
//           ref: "Product",
//           required: true,
//         },
//         size: {
//           type: String,
//           enum: ["S", "M", "L", "XL", "XXL"],
//           required: true,
//         },
//         quantity: {
//           type: Number,
//           required: true,
//           default: 1,
//         },
//         price: {
//           type: Number,
//           required: true,
//           min: 0,
//         },
//       },
//     ],
//     shippingAddress: {
//       type: String,
//       trim: true,
//       required: true,
//     },

//     // location: {
//     //   latitude: {
//     //     type: Number,
//     //   },
//     //   longitude: {
//     //     type: Number,
//     //   },
//     // },
//     orderNotes: {
//       type: String,
//       trim: true,
//     },
//     subtotal: {
//       type: Number,
//       default: 0,
//       min: 0,
//     },
//     shippingCharge: {
//       type: Number,
//       default: 0,
//       min: 0,
//     },
//     discount: {
//       type: Number,
//       default: 0,
//       min: 0,
//     },
//     totalAmount: {
//       type: Number,
//       default: 0,
//       min: 0,
//     },
//     paymentMethod: {
//       type: String,
//       enum: ["cod", "esewa"],
//       default: "cod",
//       required: true,
//     },
//     paymentStatus: {
//       type: String,
//       enum: ["pending", "paid", "failed", "refunded"],
//       required: true,
//     },
//     transcationId: {
//       transactionId: {
//         type: String,
//         default: null,
//         trim: true,
//       },
//     },
//     status: {
//       type: String,
//       enum: ["pending", "confirmed", "processing", "delivered", "cancelled"],
//       default: "pending",
//     },
//   },
//   { timestamps: true }
// );
// console.log("ORDER MODEL LOADED");

// console.log("user required:", orderSchema.path("user").isRequired);

// console.log("shippingAddress required:", orderSchema.path("shippingAddress").isRequired);

// console.log("paymentStatus required:", orderSchema.path("paymentStatus").isRequired);
// export const Order = mongoose.model("Order", orderSchema);

import mongoose, { Schema } from "mongoose";

const orderSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    products: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },

        size: {
          type: String,
          enum: ["S", "M", "L", "XL", "XXL"],
          required: true,
        },

        quantity: {
          type: Number,
          required: true,
          default: 1,
        },

        price: {
          type: Number,
          required: true,
          min: 0,
        },
      },
    ],

    shippingAddress: {
      type: String,
      required: true,
      // trim: true,
    },

    orderNotes: {
      type: String,
      trim: true,
    },

    subtotal: {
      type: Number,
      default: 0,
      min: 0,
    },

    shippingCharge: {
      type: Number,
      default: 0,
      min: 0,
    },

    discount: {
      type: Number,
      default: 0,
      min: 0,
    },

    totalAmount: {
      type: Number,
      default: 0,
      min: 0,
    },

    paymentMethod: {
      type: String,
      enum: ["cod", "esewa"],
      default: "cod",
      required: true,
    },

    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed", "refunded"],
      default: "pending",
      required: true,
    },

    transactionId: {
      type: String,
      default: null,
      trim: true,
    },

    status: {
      type: String,
      enum: ["pending", "confirmed", "processing", "delivered", "cancelled"],
      default: "pending",
    },
  },
  { timestamps: true }
);

export const Order = mongoose.model("Order", orderSchema);
