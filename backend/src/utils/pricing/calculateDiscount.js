export const calculateDiscount = (subTotal) => {
  let discount = 0;
  if (subTotal >= 5000 && subTotal <= 9999) {
    discount = subTotal * 0.05;
  }
  if (subTotal >= 10000) {
    discount = subTotal * 0.1;
  }

  return discount;
};
