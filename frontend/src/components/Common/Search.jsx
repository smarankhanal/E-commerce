import React, { useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { FaTimes } from "react-icons/fa";
import {
  clearSearch,
  searchProduct,
  setSearchQuery,
} from "../../store/slices/searchSlice";

export default function Search() {
  const dispatch = useDispatch();
  const { query } = useSelector((state) => state.search);
  useEffect(() => {
    const searchQuery = query.trim();
    if (!searchQuery) return;
    const timer = setTimeout(() => {
      dispatch(searchProduct(searchQuery));
    }, 400);
    return () => clearTimeout(timer);
  }, [query, dispatch]);
  const handleChange = (e) => {
    const value = e.target.value;
    if (!value.trim()) {
      dispatch(clearSearch());
      return;
    }
    dispatch(setSearchQuery(value));
  };
  const handleClear = () => {
    dispatch(clearSearch());
  };

  return (
    <div className="relative w-80">
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="Search products..."
        className="
          w-full
          p-2
          pr-10
          rounded-xl
          border
          border-(--input-border)
          bg-(--input-bg)
          text-(--input-text)
          placeholder:text-(--input-placeholder)
          outline-none
          focus:border-(--input-border-focus)
          focus:ring-2
          focus:ring-(--input-focus-shadow)
        "
      />

      {query ? (
        <FaTimes
          onClick={handleClear}
          className="
            absolute
            right-3
            top-1/2
            -translate-y-1/2
            cursor-pointer
            text-(--text-muted)
          "
        />
      ) : (
        <FaSearch
          className="
            absolute
            right-3
            top-1/2
            -translate-y-1/2
            text-(--text-muted)
          "
        />
      )}
    </div>
  );
}
