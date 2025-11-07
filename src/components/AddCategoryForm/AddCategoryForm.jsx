import { useForm } from "react-hook-form";
import axios from "axios";
import { useState } from "react";

export default function AddCategoryForm({
  onCategoryAdded,
  setShowCreateCategoryForm,
  mainCategoryList,
}) {
  const appUrl = import.meta.env.VITE_BACKEND_URL;
  const [isSubCategory, setIsSubCategory] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      name: "",
      desc: "",
      images: "",
      categoryId: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      const processedData = {
        ...data,
        images: data.images.split(",").map((url) => url.trim()),
      };
      await axios.post(`${appUrl}/category`, processedData);
      reset();
      if (onCategoryAdded) onCategoryAdded();
    } catch (error) {
      console.error("Failed to add category:", error);
      alert("Something went wrong.");
    }
  };

  const handleCancel = () => {
    setShowCreateCategoryForm(false);
  };

  return (
    <div className="bg-gray-50 flex mt-3 px-4 pb-10">
      <form
        className="bg-white shadow-lg rounded-xl p-8 w-full max-w-5xl"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2 className="text-3xl font-bold text-red-500 mb-8 text-center">
          Add New Category
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Toggle Subcategory */}
          <div className="md:col-span-2 flex items-center gap-3">
            <input
              type="checkbox"
              id="isSubCategory"
              checked={isSubCategory}
              onChange={() => setIsSubCategory(!isSubCategory)}
              className="h-4 w-4 text-red-500 focus:ring-red-500 border-gray-300 rounded"
            />
            <label htmlFor="isSubCategory" className="text-sm text-gray-700">
              Is this a subcategory?
            </label>
          </div>

          {/* Category Name */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1">
              Category Name
            </label>
            <input
              type="text"
              {...register("name", { required: "Category name is required" })}
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
            )}
          </div>

          {/* Category Description */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1">
              Category Description
            </label>
            <input
              type="text"
              {...register("desc", {
                required: "Category description is required",
              })}
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            {errors.desc && (
              <p className="text-red-500 text-xs mt-1">{errors.desc.message}</p>
            )}
          </div>

          {/* Parent Category Dropdown */}
          {isSubCategory && (
            <div className="flex flex-col md:col-span-2">
              <label className="text-sm font-medium text-gray-700 mb-1">
                Parent Category
              </label>
              <select
                {...register("parentId", {
                  required: "Please select a parent category",
                })}
                className="border border-gray-300 rounded-md px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                <option value="">Select a parent category</option>
                {mainCategoryList.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.name}
                  </option>
                ))}
              </select>
              {errors.parentId && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.parentId.message}
                </p>
              )}
            </div>
          )}

          {/* Buttons */}
          <div className="md:col-span-2 flex justify-center gap-4 mt-6">
            <button
              type="submit"
              className="bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-8 rounded-full transition duration-200"
            >
              Add Category
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-3 px-8 rounded-full transition duration-200"
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
