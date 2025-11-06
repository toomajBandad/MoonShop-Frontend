import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import ProductCard from "../../components/ProductCard/ProductCard";
import FilterPanel from "../../components/FilterPanel/FilterPanel";

// Helper to extract query parameters
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function Search() {
  const appUrl = import.meta.env.VITE_BACKEND_URL;

  const query = useQuery();
  const category = query.get("category");
  const search = query.get("search");
  const minPrice = query.get("minPrice");
  const maxPrice = query.get("maxPrice");
  const minDiscount = query.get("minDiscount");
  const maxDiscount = query.get("maxDiscount");
  const minRate = query.get("minRate");
  const maxRate = query.get("maxRate");

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch products when component loads or filters change
  useEffect(() => {
    const fetchFilteredProducts = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await axios.get(`${appUrl}/product/all`, {
          params: {
            category,
            search,
            minPrice,
            maxPrice,
            minDiscount,
            maxDiscount,
            minRate,
            maxRate,
          },
        });

        setProducts(response.data ? response.data : []);
      } catch (error) {
        console.error("Error fetching products:", error);
        setProducts([]);
        setError("Failed to load products. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchFilteredProducts();
  }, [
    category,
    search,
    minPrice,
    maxPrice,
    appUrl,
    minDiscount,
    maxDiscount,
    minRate,
    maxRate,
  ]);

  return (
    <div className="flex flex-row">
      <div className="min-w-64">
        <FilterPanel category={category} />
      </div>

      <div className="max-w-6xl mx-auto p-4">
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        {loading ? (
          <p className="text-gray-500 text-center">Loading products...</p>
        ) : products.length === 0 ? (
          <p className="text-gray-500 text-center">No products found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-0">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
