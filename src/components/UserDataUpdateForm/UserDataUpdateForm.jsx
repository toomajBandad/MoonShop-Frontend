import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import Swal from "sweetalert2";
import { useEffect } from "react";

export default function UserDataUpdateForm({ setShowDataForm }) {
  const appUrl = import.meta.env.VITE_BACKEND_URL;
  const { userInfos, updateUserInfos } = useAuth();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm();

  useEffect(() => {
    if (userInfos) {
      setValue("username", userInfos.username || "");
      setValue("email", userInfos.email || "");
      setValue("address", userInfos.addressesList?.[0] || "");
    }
  }, [userInfos, setValue]);

  const onSubmit = async (data) => {
    try {
      const response = await axios.patch(`${appUrl}/user/${userInfos._id}`, {
        username: data.username,
        email: data.email,
        addressesList: [data.address],
      });
      updateUserInfos(response.data.user);
      setShowDataForm(false);
      Swal.fire("Success", "User updated successfully", "success");
    } catch (error) {
      Swal.fire("Error", error.response?.data?.msg || "Update failed", "error");
    }
  };

  return (
    <div className="flex justify-center items-center px-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-lg bg-white rounded-xl shadow-lg p-8 space-y-6 animate-fade-in"
      >
        <h2 className="text-2xl font-bold text-gray-800 text-center">
          Update Your Profile
        </h2>

        {/* Username */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Username
          </label>
          <input
            type="text"
            {...register("username", {
              required: "Username is required",
              minLength: 3,
            })}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter your username"
          />
          {errors.username && (
            <p className="text-red-500 text-sm mt-1">
              {errors.username.message}
            </p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /.+@.+\..+/,
                message: "Invalid email format",
              },
            })}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter your email"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* Address */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Address
          </label>
          <input
            type="text"
            {...register("address")}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter your address"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition duration-200"
        >
          {isSubmitting ? "Updating..." : "Update Profile"}
        </button>
      </form>
    </div>
  );
}
