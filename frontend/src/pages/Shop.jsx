import { Search, ShopProductCard } from "../components";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllProduct } from "../store/slices/productSlice";

export default function Shop() {
  const dispatch = useDispatch();
  const { error, status, products } = useSelector((state) => state.product);
  const {
    results,
    query,
    loading: searchLoading,
  } = useSelector((state) => state.search);
  const isSearching = query.trim().length > 0;
  const productsToDisplay = isSearching ? results : products;

  useEffect(() => {
    if (products.length === 0) {
      dispatch(getAllProduct());
    }
  }, [dispatch, products.length]);
  return (
    <main className="px-4 py-6 md:px-6 lg:px-8">
      {/* Shop Header */}
      <div className="sticky top-20 z-20 flex flex-col items-center gap-4 border-b border-gray-100 bg-white/80 px-4 py-4 backdrop-blur-md md:flex-row md:justify-between md:px-8">
        <div>
          <p className="mb-2 text-sm font-medium uppercase tracking-widest text-blue-600">
            Our Shop
          </p>

          <p className="mt-2 max-w-xl text-sm leading-6 text-gray-500 md:text-base">
            Thoughtfully designed essentials made for your everyday.
          </p>
        </div>
        <div className="mb-8">
          <Search />
        </div>
      </div>

      {!isSearching && status === "loading" && (
        <div className="py-20 text-center text-gray-500">
          Loading products...
        </div>
      )}

      {isSearching && searchLoading && (
        <div className="py-20 text-center text-gray-500">
          Searching products...
        </div>
      )}

      {/* Error */}
      {!isSearching && status === "failed" && (
        <div className="py-20 text-center text-red-500">
          {error || "Failed to load products."}
        </div>
      )}

      {isSearching && !searchLoading && results.length === 0 && (
        <div className="py-20 text-center text-gray-500">
          No products found for "{query}".
        </div>
      )}

      {((status === "succeeded" && !isSearching) ||
        (isSearching && !searchLoading && results.length > 0)) && (
        <div className="grid grid-cols-1 gap-x-4 gap-y-8 md:grid-cols-2 lg:grid-cols-3">
          {productsToDisplay?.map((product) => (
            <ShopProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
      {/* Empty */}
      {status === "succeeded" && products.length === 0 && (
        <div className="py-20 text-center text-gray-500">
          No products available.
        </div>
      )}
    </main>
  );
}
