import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import Select from "react-select";

export default function AddProductForm({
  onProductAdded,
  setShowCreateProductForm,
}) {
  const appUrl = import.meta.env.VITE_BACKEND_URL;
  const [subCategoryList, setSubCategoryList] = useState([]);
  const [leafCategoryList, setLeafCategoryList] = useState([]);
  const [selectedLeafCategories, setSelectedLeafCategories] = useState([]);
  const [currentSubCategory, setCurrentSubCategory] = useState("");
  const [tagList, setTagList] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);

  const tagOptions = tagList.map((tag) => ({
    value: tag._id,
    label: tag.name,
  }));

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

  useEffect(() => {
    axios
      .get(`${appUrl}/category/sub`)
      .then((response) => {
        setSubCategoryList(
          response.data.filter((category) => category.parentId !== null)
        );
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
    axios
      .get(`${appUrl}/category/leaf`)
      .then((response) => {
        setLeafCategoryList(
          response.data.filter((category) => category.parentId !== null)
        );
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }, [appUrl]);

  useEffect(() => {
    axios
      .get(`${appUrl}/tag`)
      .then((response) => {
        setTagList(response.data);
      })
      .catch((error) => {
        console.error("Error fetching tags:", error);
      });
  }, [appUrl]);

  useEffect(() => {
    setSelectedLeafCategories(
      leafCategoryList.filter((cat) => cat.parentId === currentSubCategory)
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentSubCategory]);

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
        tags: selectedTags,
        images: data.images.split(",").map((url) => url.trim()),
      };
      await axios.post(`${appUrl}/product`, processedData);
      reset();
      if (onProductAdded) onProductAdded(); // Notify parent to hide form
    } catch (error) {
      console.error("Failed to add product:", error);
      alert("Something went wrong.");
    }
  };

  const handleCancel = () => {
    setShowCreateProductForm(false);
  };

  return (
    <div className="bg-gray-50 flex mt-3 px-4 pb-10">
      <form
        className="bg-white shadow-lg rounded-xl p-8 w-full max-w-5xl"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2 className="text-3xl font-bold text-red-500 mb-8 text-center">
          Add New Product
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

          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1">
              Sub category
            </label>
            <select
              onChange={(e) => setCurrentSubCategory(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              {subCategoryList.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1">
              Leaf category
            </label>
            <select
              {...register("categoryId", {
                required: "Leaf category is required",
              })}
              disabled={!currentSubCategory}
              className="border border-gray-300 rounded-md px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              <option value="">-- Select Leaf Category --</option>
              {selectedLeafCategories.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}
            </select>
            {errors.categoryId && (
              <p className="text-red-500 text-xs mt-1">
                {errors.categoryId.message}
              </p>
            )}
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-semibold text-gray-800 mb-2">
              Product Tags
            </label>
            <Select
              isMulti
              options={tagOptions}
              onChange={(selected) => {
                setSelectedTags(selected.map((tag) => tag.value));
              }}
              className="react-select-container"
              classNamePrefix="react-select"
            />
          </div>

          <div className="md:col-span-2 flex justify-center gap-4 mt-6">
            <button
              type="submit"
              className="bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-8 rounded-full transition duration-200"
            >
              Add Product
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
