import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

export default function AdminAddSubCategory() {
  const appUrl = import.meta.env.VITE_BACKEND_URL;
  const [categoryList, setCategoryList] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    axios
      .get(`${appUrl}/category`)
      .then((response) => {
        setCategoryList(
          response.data.filter((category) => category.parentId !== null)
        );
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = async (data) => {
    try {
      await axios.post(`${appUrl}/category`, data);
      console.log("Subcategory added successfully");
      reset();
    } catch (error) {
      console.error("Failed to add subcategory:", error);
    }
  };

  return (
    <div className=" flex  bg-gray-50 px-4 mt-3">
      <form
        className="bg-white shadow-md rounded-lg p-8 w-full max-w-xl"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2 className="text-3xl font-semibold text-red-500 mb-6 text-center">
          Add Subcategory
        </h2>

        <div className="space-y-5">
          {/* Parent Category Selection */}
          <div>
            <label
              htmlFor="parentId"
              className="block text-sm font-medium text-gray-700"
            >
              Parent Category
            </label>
            <select
              id="parentId"
              {...register("parentId", {
                required: "Please select a parent category",
              })}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 bg-white focus:outline-none focus:ring-red-500 focus:border-red-500"
            >
              <option value="">Select a category</option>
              {categoryList.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}
            </select>
            {errors.parentId && (
              <p className="text-red-500 text-sm mt-1">
                {errors.parentId.message}
              </p>
            )}
          </div>

          {/* Subcategory Name */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Subcategory Name
            </label>
            <input
              id="name"
              type="text"
              {...register("name", {
                required: "Subcategory name is required",
              })}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-red-500 focus:border-red-500"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          {/* Subcategory Description */}
          <div>
            <label
              htmlFor="desc"
              className="block text-sm font-medium text-gray-700"
            >
              Subcategory Description
            </label>
            <input
              id="desc"
              type="text"
              {...register("desc", {
                required: "Subcategory description is required",
              })}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-red-500 focus:border-red-500"
            />
            {errors.desc && (
              <p className="text-red-500 text-sm mt-1">{errors.desc.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-6 rounded-md transition duration-200"
            >
              Add Subcategory
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
