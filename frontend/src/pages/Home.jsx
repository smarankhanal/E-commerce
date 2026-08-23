import React, { useEffect } from "react";
import { BestSeller, CollectionSlider, Hero } from "../components";
import { useDispatch, useSelector } from "react-redux";
import { getAllCollections } from "../store/slices/collectionSlice";
import { getBestSellers } from "../store/slices/productSlice";

export default function Home() {
  const dispatch = useDispatch();

  const { status, collections, error } = useSelector(
    (state) => state.collection,
  );

  const { bestSellersProduct } = useSelector((state) => state.product);

  useEffect(() => {
    if (collections.length === 0) {
      dispatch(getAllCollections());
    }

    if (bestSellersProduct?.length === 0) {
      dispatch(getBestSellers());
    }
  }, [dispatch, collections.length, bestSellersProduct?.length]);

  return (
    <div>
      <Hero />

      <BestSeller products={bestSellersProduct} />

      <CollectionSlider
        status={status}
        error={error}
        collections={collections}
      />
    </div>
  );
}
