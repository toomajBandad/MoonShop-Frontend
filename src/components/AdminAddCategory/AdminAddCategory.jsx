import { useForm } from "react-hook-form";
import axios from "axios";

export default function AdminAddCategory() {
  const appUrl = import.meta.env.VITE_BACKEND_URL;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await axios.post(`${appUrl}/category`, data);
      console.log("succes");
      reset();
    } catch (error) {
      console.error("Failed to add category:", error);
    }
  };

  return (
    <div className=" flex  bg-gray-50 px-4 mt-3">
      <form
        className="bg-white shadow-md rounded-lg p-8 w-full max-w-xl"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2 className="text-3xl font-semibold text-red-500 mb-6 text-center">
          Add Category
        </h2>

        <div className="space-y-5">
          {/* Category Name */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Category Name
            </label>
            <input
              id="name"
              type="text"
              {...register("name", { required: "Category name is required" })}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-red-500 focus:border-red-500"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="desc"
              className="block text-sm font-medium text-gray-700"
            >
              Category Description
            </label>
            <input
              id="desc"
              type="text"
              {...register("desc", {
                required: "Category description is required",
              })}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-red-500 focus:border-red-500"
            />
            {errors.desc && (
              <p className="text-red-500 text-sm mt-1">{errors.desc.message}</p>
            )}
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-6 rounded-md transition duration-200 cursor-pointer"
            >
              Add Category
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
