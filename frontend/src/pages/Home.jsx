import React from "react";
import { BestSeller, CollectionSlider, Hero } from "../components";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllCollections } from "../store/slices/collectionSlice";

export default function Home() {
  const dispatch = useDispatch();
  const { status, collections, error } = useSelector(
    (state) => state.collection,
  );
  useEffect(() => {
    if (collections.length === 0) {
      dispatch(getAllCollections());
    }
  }, [dispatch, collections.length]);
  return (
    <div>
      <Hero />
      <BestSeller />
      <CollectionSlider
        status={status}
        error={error}
        collections={collections}
      />
    </div>
  );
}
