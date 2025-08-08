import "./YourProfile.css";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import axios from "axios";
import { useState, useEffect } from "react";
import { MdOutlineEdit } from "react-icons/md";
import { IoLocationOutline } from "react-icons/io5";
import { BiMoneyWithdraw } from "react-icons/bi";

export default function YourProfile() {
  const navigate = useNavigate();
  const appUrl = import.meta.env.VITE_BACKEND_URL;

  const { logout, userInfos } = useAuth();

  const [editingAddress, setEditingAddress] = useState(false);
  const [newAddress, setNewAddress] = useState(userInfos.addressesList[0]);
  const [editingCredit, setEditingCredit] = useState(false);
  const [newCredit, setNewCredit] = useState(0);

  useEffect(() => {
    if (userInfos) {
      setNewAddress(userInfos.addressesList?.[0] || "");
      setNewCredit(userInfos.creditBalance || 0);
    }
  }, [userInfos]);

  const deleteUser = (userId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        logout();
        navigate("/");
        axios
          .delete(`${appUrl}/user/${userId}`)
          .then(() => {
            Swal.fire({
              title: "Success",
              text: "Your account deleted successfully",
              icon: "success",
            });
          })
          .catch((error) => {
            console.error("Axios error:", error);
            Swal.fire({
              title: "Error!",
              text: "Deletion failed. Please try again.",
              icon: "error",
            });
          });
      }
    });
  };

  const updateUserField = async (field, value) => {
    try {
      const updatedUser = {
        addressesList: newAddress,
        creditBalance: newCredit,
      };
      await axios.put(`${appUrl}/user/${userInfos._id}`, updatedUser);
      console.log(updatedUser);
      Swal.fire("Updated!", `${field} updated successfully`, "success");
    } catch (err) {
      console.log(err);
      Swal.fire("Error", `Failed to update ${field}`, "error");
    }
  };

  return (
    <div className="yourProfile__container flex flex-col w-full py-8 bg-gray-50 mt-5">
      {/* Profile Header */}
      <div className="flex gap-6 items-center bg-white p-6 rounded-lg shadow-md w-full max-w-xl">
        <div className="w-24 h-24">
          <img
            src="./images/icons/man.png"
            alt="Profile"
            className="w-full h-full rounded-full object-cover"
          />
        </div>
        <div className="flex flex-col gap-2">
          <div className="text-lg font-semibold text-gray-800">
            👤 Username: {userInfos?.username}
          </div>
          <div className="text-gray-700">📧 Email: {userInfos?.email}</div>
        </div>
      </div>

      {/* Editable Info Section */}
      <div className="mt-8 space-y-6 bg-white p-6 rounded-lg shadow-md max-w-xl w-full">
        {/* Address */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2 mb-2">
            <IoLocationOutline /> Address
          </h3>
          {!editingAddress ? (
            <div className="flex items-center justify-between">
              <p className="text-gray-700">
                {userInfos?.addressesList?.[0] || "No address saved"}
              </p>
              <button
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1 rounded flex justify-center items-center gap-2 cursor-pointer"
                onClick={() => setEditingAddress(true)}
              >
                <MdOutlineEdit />
                Edit
              </button>
            </div>
          ) : (
            <div className="space-y-2">
              <input
                type="text"
                value={newAddress}
                onChange={(e) => setNewAddress(e.target.value)}
                className="border p-2 rounded w-full"
              />
              <div className="flex gap-2">
                <button
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                  onClick={async () => {
                    await updateUserField("addressesList", newAddress);
                    setEditingAddress(false);
                  }}
                >
                  💾 Save
                </button>
                <button
                  className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded"
                  onClick={() => setEditingAddress(false)}
                >
                  ❌ Cancel
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Credit Balance */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2 mb-2">
            <BiMoneyWithdraw /> Credit Balance
          </h3>
          {!editingCredit ? (
            <div className="flex items-center justify-between">
              <p className="text-gray-700">
                €{userInfos?.creditBalance?.toFixed(2) || "0.00"}
              </p>
              <button
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1 rounded flex justify-center items-center gap-2 cursor-pointer"
                onClick={() => setEditingCredit(true)}
              >
                <MdOutlineEdit /> Edit
              </button>
            </div>
          ) : (
            <div className="space-y-2">
              <input
                type="number"
                value={newCredit}
                onChange={(e) => setNewCredit(parseFloat(e.target.value))}
                className="border p-2 rounded w-full"
              />
              <div className="flex gap-2">
                <button
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                  onClick={async () => {
                    await updateUserField("creditBalance", newCredit);
                    setEditingCredit(false);
                  }}
                >
                  💾 Save
                </button>
                <button
                  className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded"
                  onClick={() => setEditingCredit(false)}
                >
                  ❌ Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Delete Button */}
      <div className="mt-8">
        <button
          className="border border-red-600 text-red-600 px-6 py-3 rounded hover:bg-red-600 hover:text-white transition"
          onClick={() => deleteUser(userInfos._id)}
        >
          🗑️ Delete Account
        </button>
      </div>
    </div>
  );
}
