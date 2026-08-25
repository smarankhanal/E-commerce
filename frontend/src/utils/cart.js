export const getDefaultSize = (sizes = []) => {
  return sizes.find((item) => item.stock > 0)?.size || null;
};
export const normalizeCartItem = (product, selectedSize = null) => {
  const size = selectedSize || getDefaultSize(product.sizes);
  if (!size) return null;

  const variant = product.sizes?.find((item) => item.size === size);
  if (!variant || variant.stock <= 0) {
    return null;
  }
  return {
    id: `${product._id}-${size}`,
    sku: product.sku,
    productId: product._id,
    name: product.name,
    price: Number(product.price) || 0,
    image: product.image,
    selectedSize: size,
    quantity: 1,
  };
};
