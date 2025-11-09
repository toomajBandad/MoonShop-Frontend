import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

export default function FilterPanel({ category }) {
  const navigate = useNavigate();
  const query = new URLSearchParams(useLocation().search);

  // Initialize sliders from query params or defaults
  const [discountRange, setDiscountRange] = useState([
    Number(query.get("minDiscount")) || 0,
    Number(query.get("maxDiscount")) || 50,
  ]);
  const [priceRange, setPriceRange] = useState([
    Number(query.get("minPrice")) || 10,
    Number(query.get("maxPrice")) || 3000,
  ]);
  const [rateRange, setRateRange] = useState([
    Number(query.get("minRate")) || 0,
    Number(query.get("maxRate")) || 5,
  ]);

  function handleFilter() {
    const params = new URLSearchParams();
    if (category) params.set("category", category);
    params.set("minDiscount", discountRange[0]);
    params.set("maxDiscount", discountRange[1]);
    params.set("minPrice", priceRange[0]);
    params.set("maxPrice", priceRange[1]);
    params.set("minRate", rateRange[0]);
    params.set("maxRate", rateRange[1]);

    navigate(`/search?${params.toString()}`);
  }

  useEffect(() => {
    handleFilter();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category, discountRange, priceRange, rateRange]);

  const handleReset = () => {
    setDiscountRange([0, 50]);
    setPriceRange([10, 3000]);
    setRateRange([0, 5]);
    navigate(`/search/?category=${category}`);
  };

  return (
    <div className="flex flex-col gap-6 p-6 border-1 border-gray-200   rounded-md h-full">
      <h2 className="text-xl">Filters</h2>
      {/* Discount Slider */}
      <div>
        <label className="block text-sm text-gray-600 mb-1">
          Discount: {discountRange[0]}% – {discountRange[1]}%
        </label>
        <Slider
          range
          min={0}
          max={50}
          step={5}
          value={discountRange}
          onChange={setDiscountRange}
          trackStyle={[{ backgroundColor: "#ed1944" }]}
          handleStyle={[
            { backgroundColor: "#ed1944", borderColor: "#ed1944" },
            { backgroundColor: "#ed1944", borderColor: "#ed1944" },
          ]}
        />
      </div>
      <hr className="text-gray-300"></hr>

      {/* Price Slider */}
      <div>
        <label className="block text-sm text-gray-600 mb-1">
          Price: {priceRange[0]}€ – {priceRange[1]}€
        </label>
        <Slider
          range
          min={0}
          max={3000}
          step={100}
          value={priceRange}
          onChange={setPriceRange}
          trackStyle={[{ backgroundColor: "#ed1944" }]}
          handleStyle={[
            { backgroundColor: "#ed1944", borderColor: "#ed1944" },
            { backgroundColor: "#ed1944", borderColor: "#ed1944" },
          ]}
        />
      </div>
       <hr className="text-gray-300"></hr>

      {/* Rate Slider */}
      <div>
        <label className="block text-sm text-gray-600 mb-1">
          Rate: {rateRange[0]}★ – {rateRange[1]}★
        </label>
        <Slider
          range
          min={0}
          max={5}
          step={0.5}
          value={rateRange}
          onChange={setRateRange}
          trackStyle={[{ backgroundColor: "#ed1944" }]}
          handleStyle={[
            { backgroundColor: "#ed1944", borderColor: "#ed1944" },
            { backgroundColor: "#ed1944", borderColor: "#ed1944" },
          ]}
        />
      </div>

      {/* Buttons */}
      <div className="flex gap-4 text-sm">
        <button
          type="button"
          onClick={handleReset}
          className="bg-gray-300 text-black px-2 py-1 rounded"
        >
          Reset Filters
        </button>
      </div>
    </div>
  );
}
