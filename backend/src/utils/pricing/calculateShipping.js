export const calculateShipping = (subTotal, shippingAddress) => {
  let shippingCharge = 0;
  if (subTotal >= 10000) {
    return 0;
  }
  if (shippingAddress.toLowerCase().includes("bharatpur")) {
    shippingCharge = 100;
  } else {
    shippingCharge = 200;
  }
  return shippingCharge;
};
