import { useEffect, useState } from "react";
import axios from "axios";

export default function AdminEditProduct() {
  const appUrl = import.meta.env.VITE_BACKEND_URL;

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch products from server on component mount
  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await axios.get(`${appUrl}/product/all`); // Replace with your actual endpoint
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  const handleCreateProduct = () => {
    // Navigate to product creation page or open a modal
    console.log("Create new product clicked");
  };

  return (
    <div style={{ padding: "20px" }}>
      <button onClick={handleCreateProduct} style={{ marginBottom: "20px" }}>
        Create New Product
      </button>

      {loading ? (
        <p>Loading products...</p>
      ) : (
        <div>
          <h2>Product Cart</h2>
          {products.length === 0 ? (
            <p>No products available.</p>
          ) : (
            <ul style={{ listStyle: "none", padding: 0 }}>
              {products.map((product) => (
                <li
                  key={product._id}
                  style={{
                    border: "1px solid #ccc",
                    padding: "10px",
                    marginBottom: "10px",
                  }}
                >
                  <strong>{product.name}</strong> - ${product.price}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
