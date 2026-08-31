export const calculateSubtotal = (products) => {
  return Array.from(products).reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);
};
