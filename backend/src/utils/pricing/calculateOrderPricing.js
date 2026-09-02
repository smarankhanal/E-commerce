import { calculateSubtotal } from "./calculateSubtotal.js";
import { calculateDiscount } from "./calculateDiscount.js";
import { calculateShipping } from "./calculateShipping.js";
import { calculateTotal } from "./calculateTotal.js";

export const calculateOrderPricing = ({ products, shippingAddress }) => {
  const subtotal = calculateSubtotal(products);
  const discount = calculateDiscount(subtotal);

  const shippingCharge = calculateShipping(subtotal, shippingAddress);
  const totalAmount = calculateTotal(subtotal, discount, shippingCharge);

  return {
    subtotal,
    discount,
    shippingCharge,
    totalAmount,
  };
};
