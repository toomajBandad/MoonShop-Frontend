import { useForm } from "react-hook-form";
import axios from "axios";

export default function EditTagForm({ tag, onTagUpdated, setShowEditTagForm }) {
  const appUrl = import.meta.env.VITE_BACKEND_URL;

  const inputFields = [
    {
      label: "Tag name",
      name: "name",
      type: "text",
      required: "Tagname is required",
    },
  ];

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      ...tag,
    },
  });

  const onSubmit = async (data) => {
    try {
      await axios.put(`${appUrl}/tag/${tag._id}`, data);
      if (onTagUpdated) onTagUpdated(); // Notify parent to hide form
    } catch (error) {
      console.error("Failed to update Tag:", error);
      alert("Something went wrong.");
    }
  };

  const handleCancel = () => {
    setShowEditTagForm(false);
  };

  return (
    <div className="bg-gray-50 flex mt-3 px-4 pb-10">
      <form
        className="bg-white shadow-lg rounded-xl p-8 w-full max-w-5xl"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2 className="text-3xl font-bold text-red-500 mb-8 text-center">
          Edit Tag
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {inputFields.map(({ label, name, type, required }) => (
            <div key={name} className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-1">
                {label}
              </label>
              <input
                type={type}
                {...register(name, required ? { required } : {})}
                className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
              />
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
              Update Tag
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
