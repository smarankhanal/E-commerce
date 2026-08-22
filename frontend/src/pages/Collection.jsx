import React, { useEffect } from "react";
import { Search, CollectionProductCard } from "../components";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSingleCollection } from "../store/slices/collectionSlice.js";

export default function Collection() {
  const { slug } = useParams();
  const dispatch = useDispatch();
  const { collection, collectionProducts } = useSelector(
    (state) => state.collection,
  );
  useEffect(() => {
    if (slug) {
      dispatch(getSingleCollection(slug));
    }
  }, [dispatch, slug]);

  return (
    <main className="px-4 py-6 md:px-6 lg:px-8">
      {/* Shop Header */}
      <div className="sticky top-25 z-20 flex flex-col items-center gap-4 border-b border-gray-100 bg-white/80 px-4 py-4 backdrop-blur-md md:flex-row md:justify-between md:px-8">
        <div>
          <p className="mb-2 text-sm font-medium uppercase tracking-widest text-blue-600">
            {collection?.name}
          </p>

          <p className="mt-2 max-w-xl text-sm leading-6 text-gray-500 md:text-base">
            {collection?.description}
          </p>
        </div>
        <div className="ml-10">
          <Search />
        </div>
      </div>

      {/* Products */}
      <div className="grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-2 lg:grid-cols-3">
        {collectionProducts.map((product) => (
          <CollectionProductCard key={product._id} product={product} />
        ))}
      </div>
    </main>
  );
}
