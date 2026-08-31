export const calculateTotal = (subtotal, discount, shippingCharge) => {
  return subtotal - discount + shippingCharge;
};
