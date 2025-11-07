import { useForm } from "react-hook-form";
import axios from "axios";

export default function EditProductForm({
  product,
  onProductUpdated,
  setShowEditProductForm,
}) {
  const appUrl = import.meta.env.VITE_BACKEND_URL;

  const inputFields = [
    {
      label: "Product Name",
      name: "name",
      type: "text",
      required: "Product name is required",
    },
    {
      label: "Brand Name",
      name: "brand",
      type: "text",
      required: "Product brand is required",
    },
    { label: "Description", name: "desc", type: "textarea" },
    { label: "Tags (comma separated)", name: "tags", type: "text" },
    {
      label: "Price ($)",
      name: "price",
      type: "text",
      required: "Price is required",
    },
    {
      label: "Product discount",
      name: "discount",
      type: "text",
      required: "Product discount is required",
    },
    {
      label: "Product sold",
      name: "sold",
      type: "text",
      required: "Product sold is required",
    },
    { label: "Product images", name: "images", type: "textarea" },
    {
      label: "Product stock",
      name: "stock",
      type: "text",
      required: "Product stock is required",
    },
    {
      label: "Product ratings",
      name: "ratings",
      type: "text",
      required: "Product ratings is required",
    },
  ];

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      ...product,
      tags: Array.isArray(product?.tags)
        ? product.tags
            .map((tag) => (typeof tag === "object" ? tag.name : tag))
            .join(", ")
        : "",
      images: Array.isArray(product?.images)
        ? product.images
            .map((img) => (typeof img === "object" ? img.url : img))
            .join(", ")
        : "",
    },
  });

  const onSubmit = async (data) => {
    try {
      const processedData = {
        ...data,
        tags: data.tags.split(",").map((tag) => tag.trim()),
        images: data.images.split(",").map((url) => url.trim()),
      };
      console.log(processedData);

      await axios.put(`${appUrl}/product/update/${product._id}`, processedData);
      if (onProductUpdated) onProductUpdated(); // Notify parent to hide form
    } catch (error) {
      console.error("Failed to update product:", error);
      alert("Something went wrong.");
    }
  };

  const handleCancel = () => {
    setShowEditProductForm(false);
  };

  return (
    <div className="bg-gray-50 flex mt-3 px-4 pb-10">
      <form
        className="bg-white shadow-lg rounded-xl p-8 w-full max-w-5xl"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2 className="text-3xl font-bold text-red-500 mb-8 text-center">
          Edit Product
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {inputFields.map(({ label, name, type, required }) => (
            <div key={name} className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-1">
                {label}
              </label>
              {type === "textarea" ? (
                <textarea
                  {...register(name, required ? { required } : {})}
                  className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              ) : (
                <input
                  type={type}
                  {...register(name, required ? { required } : {})}
                  className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              )}
              {errors[name] && (
                <p className="text-red-500 text-xs mt-1">
                  {errors[name].message}
                </p>
              )}
            </div>
          ))}

          <div className="md:col-span-2 flex justify-center gap-4 mt-6">
            <button
              type="submit"
              className="bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-8 rounded-full transition duration-200"
            >
              Update Product
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
