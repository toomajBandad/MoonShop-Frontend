import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import ProductCardTiny from "../components/ProductCardTiny/ProductCardTiny";
import AddProductForm from "../components/AddProductForm/AddProductForm";
import EditProductForm from "../components/EditProductForm/EditProductForm";
import { toast } from "react-toastify";

export default function AdminEditProduct() {
  const appUrl = import.meta.env.VITE_BACKEND_URL;

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateProductForm, setShowCreateProductForm] = useState(false);
  const [showEditProductForm, setShowEditProductForm] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const refreshProducts = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${appUrl}/product/all`);
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  function editProductInfos(product) {
    setSelectedProduct(product);
    setShowEditProductForm(true);
  }

  function deleteProduct(product) {
    Swal.fire({
      title: "Are you sure?",
      text: `Do you really want to delete "${product.name}"?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`${appUrl}/product/${product._id}`);
          Swal.fire("Deleted!", "Product has been deleted.", "success");
          refreshProducts();
        } catch (error) {
          console.error("Delete failed:", error);
          Swal.fire("Error", "Failed to delete product.", "error");
        }
      }
    });
  }

  useEffect(() => {
    refreshProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCreateProduct = () => {
    setShowCreateProductForm(true);
  };

  return (
    <div className="p-5 md:p-10">
      {showCreateProductForm ? (
        <AddProductForm
          setShowCreateProductForm={setShowCreateProductForm}
          onProductAdded={() => {
            setShowCreateProductForm(false);
            refreshProducts();
            toast.success("Product Created Successfully!");
          }}
        />
      ) : showEditProductForm && selectedProduct ? (
        <EditProductForm
          product={selectedProduct}
          onProductUpdated={() => {
            setShowEditProductForm(false);
            setSelectedProduct(null);
            refreshProducts();
            toast.success("Product Updated Successfully!");
          }}
        />
      ) : (
        <>
          <button
            onClick={handleCreateProduct}
            className="mb-5 px-4 py-2 bg-default-softRed shadow-sm text-white rounded hover:bg-red-600 hover:cursor-pointer transition hover:shadow-lg"
          >
            Create New Product
          </button>

          {loading ? (
            <p className="text-gray-600">Loading products...</p>
          ) : (
            <div>
              {products.length === 0 ? (
                <p className="text-gray-500">No products available.</p>
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-2">
                  {products.map((product) => (
                    <ProductCardTiny
                      key={product._id}
                      product={product}
                      onRemove={deleteProduct}
                      onEdit={() => editProductInfos(product)}
                    />
                  ))}
                </div>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}
