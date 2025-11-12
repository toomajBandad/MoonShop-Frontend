import { useForm } from "react-hook-form";
import axios from "axios";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";

export default function UserPassUpdateForm({setShowPassForm}) {
  const { userInfos } = useAuth();
  const appUrl = import.meta.env.VITE_BACKEND_URL;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data.currentPassword, data.newPassword);

    try {
      await axios.put(`${appUrl}/user/updatePassword/${userInfos._id}`, {
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
      });

      Swal.fire("Success", "Password updated successfully", "success");
      reset();
      setShowPassForm(false)
    } catch (error) {
      Swal.fire(
        "Error",
        error.response?.data?.message || "Password update failed with",
        "error"
      );
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow space-y-4"
    >
      <h2 className="text-xl font-bold text-gray-800 text-center">
        Change Password
      </h2>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Old Password
        </label>
        <input
          type="password"
          {...register("currentPassword", {
            required: "Old password is required",
          })}
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
        />
        {errors.currentPassword && (
          <p className="text-red-500 text-sm mt-1">
            {errors.currentPassword.message}
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          New Password
        </label>
        <input
          type="password"
          {...register("newPassword", {
            required: "New password is required",
            minLength: { value: 6, message: "Must be at least 6 characters" },
          })}
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
        />
        {errors.newPassword && (
          <p className="text-red-500 text-sm mt-1">
            {errors.newPassword.message}
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Confirm New Password
        </label>
        <input
          type="password"
          {...register("confirmPassword", {
            validate: (value) =>
              value === watch("newPassword") || "Passwords do not match",
          })}
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
        />
        {errors.confirmPassword && (
          <p className="text-red-500 text-sm mt-1">
            {errors.confirmPassword.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition duration-200"
      >
        {isSubmitting ? "Updating..." : "Update Password"}
      </button>
    </form>
  );
}
