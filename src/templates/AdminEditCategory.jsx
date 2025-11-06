import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { toast } from "react-toastify";
import CategoryCardTiny from "../components/CategoryCardTiny/CategoryCardTiny";
import EditCategoryForm from "../components/EditCategoryForm/EditCategoryForm";
import AddCategoryForm from "../components/AddCategoryForm/AddCategoryForm";

export default function AdminEditCategory() {
  const appUrl = import.meta.env.VITE_BACKEND_URL;

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateCategoryForm, setShowCreateCategoryForm] = useState(false);
  const [showEditCategoryForm, setShowEditCategoryForm] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const refreshCategories = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${appUrl}/category`);
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      setLoading(false);
    }
  };

  function editCategoryInfos(category) {
    setSelectedCategory(category);
    setShowEditCategoryForm(true);
  }

  function deleteCategory(category) {
    Swal.fire({
      title: "Are you sure?",
      text: `Do you really want to delete "${category.name}"?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`${appUrl}/category/${category._id}`);
          Swal.fire("Deleted!", "Category has been deleted.", "success");
          refreshCategories();
        } catch (error) {
          console.error("Delete failed:", error);
          Swal.fire("Error", "Failed to delete category.", "error");
        }
      }
    });
  }

  useEffect(() => {
    refreshCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCreateCategory = () => {
    setShowCreateCategoryForm(true);
  };

  return (
    <div className="p-5 md:p-10">
      {showCreateCategoryForm ? (
        <AddCategoryForm
          onCategoryAdded={() => {
            setShowCreateCategoryForm(false);
            refreshCategories();
            toast.success("Category Created Successfully!");
          }}
        />
      ) : showEditCategoryForm && selectedCategory ? (
        <EditCategoryForm
          category={selectedCategory}
          onCategoryUpdated={() => {
            setShowEditCategoryForm(false);
            setSelectedCategory(null);
            refreshCategories();
            toast.success("Category Updated Successfully!");
          }}
        />
      ) : (
        <>
          <button
            onClick={handleCreateCategory}
            className="mb-5 px-4 py-2 bg-default-softRed shadow-sm text-white rounded hover:bg-red-600 hover:cursor-pointer transition hover:shadow-lg"
          >
            Create New Category
          </button>

          {loading ? (
            <p className="text-gray-600">Loading Categories...</p>
          ) : (
            <div>
              {categories.length === 0 ? (
                <p className="text-gray-500">No Categories available.</p>
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-2">
                  {categories.map((category) => (
                    <CategoryCardTiny
                      key={category._id}
                      category={category}
                      onRemove={deleteCategory}
                      onEdit={() => editCategoryInfos(category)}
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
