import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

export default function AdminAddProduct() {
  const appUrl = import.meta.env.VITE_BACKEND_URL;
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await axios.post(`${appUrl}/product`, data); // Adjust endpoint as needed
      alert("Product added successfully!");
      reset(); // Clear the form
    } catch (error) {
      console.error("Failed to add product:", error);
      alert("Something went wrong.");
    }
  };

  return (
    <div className="formContainer flex justify-center items-center w-full h-full">
      <form
      className="w-full"
        onSubmit={handleSubmit(onSubmit)}
        style={{ margin: "auto" }}
      >
        <h2 className="mb-5">Add Product</h2>

        <div className="grid grid-rows-4 grid-cols-3 gap-10 mt-5">
          <div className="bg-gray-100 flex flex-col ">
            <label>Product Name:</label>
            <input
              {...register("name", { required: "Product name is required" })}
              type="text"
            />
            {errors.name && (
              <p className="text-red-400 text-xs">{errors.name.message}</p>
            )}
          </div>

          <div className="bg-gray-100 flex flex-col">
            <label>Brand Name:</label>
            <input
              {...register("brand", { required: "Product brand is required" })}
              type="text"
            />
            {errors.brand && (
              <p className="text-red-400 text-xs">{errors.brand.message}</p>
            )}
          </div>

          <div className="bg-gray-100 flex flex-col">
            <label>Description:</label>
            <textarea
              {...register("description")}
            />
          </div>


          <div className="bg-gray-100 flex flex-col">
            <label>Tags (comma separated):</label>
            <input
              {...register("tags")}
              type="text"
            />
          </div>

          <div className="bg-gray-100 flex flex-col">
            <label>Price ($):</label>
            <input
              {...register("price", {
                required: "Price is required",
                valueAsNumber: true,
                min: { value: 0.01, message: "Price must be at least €0.01" },
              })}
              type="number"
              step="0.01"
            />
            {errors.price && (
              <p className="text-red-400 text-xs">{errors.price.message}</p>
            )}
          </div>

          <div className="bg-gray-100 flex flex-col">
            <label>Product discount:</label>
            <input
              {...register("discount", {
                required: "Product discount is required",
              })}
              type="text"
            />
            {errors.discount && (
              <p className="text-red-400 text-xs">{errors.discount.message}</p>
            )}
          </div>

          <div className="bg-gray-100 flex flex-col">
            <label>Product sold:</label>
            <input
            className="border-1 border-gray-400"
              {...register("sold", { required: "Product sold is required" })}
              type="text"
            />
            {errors.sold && (
              <p className="text-red-400 text-xs">{errors.sold.message}</p>
            )}
          </div>

          <div className="bg-gray-100 flex flex-col">
            <label>Product images:</label>
            <input
              {...register("images", {
                required: "Product images is required",
              })}
              type="text"
            />
            {errors.images && (
              <p className="text-red-400 text-xs">{errors.images.message}</p>
            )}
          </div>

          <div className="bg-gray-100 flex flex-col">
            <label>Product categoryId:</label>
            <input
              {...register("categoryId", {
                required: "Product categoryId is required",
              })}
              type="text"
            />
            {errors.categoryId && (
              <p className="text-red-400 text-xs">
                {errors.categoryId.message}
              </p>
            )}
          </div>

          <div className="bg-gray-100 flex flex-col">
            <label>Product stock:</label>
            <input
              {...register("stock", { required: "Product stock is required" })}
              type="text"
            />
            {errors.stock && (
              <p className="text-red-400 text-xs">{errors.stock.message}</p>
            )}
          </div>


          <div className="bg-gray-100 flex flex-col">
            <label>Product ratings:</label>
            <input
              {...register("ratings", {
                required: "Product ratings is required",
              })}
              type="text"
            />
            {errors.ratings && (
              <p className="text-red-400 text-xs">{errors.ratings.message}</p>
            )}
          </div>

          <div className="flex justify-center items-center">
            <button
              type="submit"
              className="bg-red-500 text-white rounded-4xl cursor-pointer hover:bg-red-600 p-5"
            >
              Add Product
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
