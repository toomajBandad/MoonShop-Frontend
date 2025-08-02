import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

export default function AdminAddProduct() {
  const appUrl = import.meta.env.VITE_BACKEND_URL;
  // const [mainCategoryList, setMainCategoryList] = useState([]);
  const [subCategoryList, setSubCategoryList] = useState([]);

  useEffect(() => {
    getCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getCategories = () => {
    axios
      .get(`${appUrl}/category`)
      .then((response) => {
        // setMainCategoryList(
        //   response.data.filter((category) => category.parentId === null)
        // );
        setSubCategoryList(
          response.data.filter((category) => category.parentId !== null)
        );
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      reviews: [],
      tags: [],
      images: [],
    },
  });

  const onSubmit = async (data) => {
    try {
      const processedData = {
        ...data,
        images: data.images.split(",").map((url) => url.trim()), // ✅ Converts to array
      };
      console.log(processedData);
      await axios.post(`${appUrl}/product`, processedData); // Adjust endpoint as needed
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
        <h2 className="my-5 text-red-500 text-2xl">Add Product</h2>

        <div className="grid grid-rows-6 grid-cols-2 gap-1 mt-5">
          <div className="bg-gray-100 flex flex-col ">
            <label>Product Name:</label>
            <input
              className="border-1 border-gray-400 py-1 mx-3"
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
              className="border-1 border-gray-400 py-1 mx-3"
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
              className="border-1 border-gray-400 py-1 mx-3"
              {...register("desc")}
            />
          </div>

          <div className="bg-gray-100 flex flex-col">
            <label>Tags (comma separated):</label>
            <input
              className="border-1 border-gray-400 py-1 mx-3"
              {...register("tags")}
              type="text"
            />
          </div>

          <div className="bg-gray-100 flex flex-col">
            <label>Price ($):</label>
            <input
              className="border-1 border-gray-400 py-1 mx-3"
              {...register("price", {
                required: "Price is required",
              })}
              type="text"
            />
            {errors.price && (
              <p className="text-red-400 text-xs">{errors.price.message}</p>
            )}
          </div>

          <div className="bg-gray-100 flex flex-col">
            <label>Product discount:</label>
            <input
              className="border-1 border-gray-400 py-1 mx-3"
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
              className="border-1 border-gray-400 py-1 mx-3"
              {...register("sold", { required: "Product sold is required" })}
              type="text"
            />
            {errors.sold && (
              <p className="text-red-400 text-xs">{errors.sold.message}</p>
            )}
          </div>

          <div className="bg-gray-100 flex flex-col">
            <label>Product images:</label>
            <textarea
              className="border-1 border-gray-400 py-1 mx-3"
              {...register("images")}
            />
            {errors.images && (
              <p className="text-red-400 text-xs">{errors.images.message}</p>
            )}
          </div>

          <div className="bg-gray-100 flex flex-col">
            <label>Product category:</label>
            <select
              className="border-1 border-gray-400 py-1 mx-3"
              {...register("categoryId", { required: true })}
            >
              {subCategoryList.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          <div className="bg-gray-100 flex flex-col">
            <label>Product stock:</label>
            <input
              className="border-1 border-gray-400 py-1 mx-3"
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
              className="border-1 border-gray-400 py-1 mx-3"
              {...register("ratings", {
                required: "Product ratings is required",
              })}
              type="text"
            />
            {errors.ratings && (
              <p className="text-red-400 text-xs">{errors.ratings.message}</p>
            )}
          </div>

          <div className="bg-gray-100 flex flex-col ">
            <label>Product reviews:</label>
            <input
              className="border-1 border-gray-400 py-1 mx-3"
              {...register("reviews")}
              type="text"
            />
            {errors.reviews && (
              <p className="text-red-400 text-xs">{errors.reviews.message}</p>
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
