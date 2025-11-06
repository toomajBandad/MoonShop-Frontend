import { useEffect, useState } from "react";
import axios from "axios";
import ProductCardTiny from "../components/ProductCardTiny/ProductCardTiny";

export default function AdminEditProduct() {
  const appUrl = import.meta.env.VITE_BACKEND_URL;

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  function editProductInfos(e, product) {
    console.log(e, product);
  }
  function deleteProduct(e, product) {
    console.log(e, product);
  }

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await axios.get(`${appUrl}/product/all`);
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, [appUrl]);

  const handleCreateProduct = () => {
    console.log("Create new product clicked");
  };

  return (
    <div className="p-5 md:p-10">
      <button
        onClick={handleCreateProduct}
        className="mb-5 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        Create New Product
      </button>

      {loading ? (
        <p className="text-gray-600">Loading products...</p>
      ) : (
        <div>
          <h2 className="text-xl font-semibold mb-4">Product Cart</h2>
          {products.length === 0 ? (
            <p className="text-gray-500">No products available.</p>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-2">
              {products.map((product) => (
                <ProductCardTiny
                  key={product._id}
                  product={product}
                  onRemove={deleteProduct}
                  onEdit={editProductInfos}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
