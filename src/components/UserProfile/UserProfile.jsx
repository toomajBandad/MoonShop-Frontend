import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import defaultAvatar from "/images/icons/man.png";
import UserDataUpdateForm from "../UserDataUpdateForm/UserDataUpdateForm";
import UserPassUpdateForm from "../UserPassUpdateForm/UserPassUpdateForm";
import Modal from "../Modal/Modal";

export default function UserProfile() {
  const { userInfos } = useAuth();
  const [showDataForm, setShowDataForm] = useState(false);
  const [showPassForm, setShowPassForm] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 py-10 px-4 flex flex-col items-center">
      <div className="w-full max-w-3xl bg-white rounded-xl shadow-lg p-6 space-y-6">
        <h2 className="text-2xl font-bold text-gray-800 text-center">Your Profile</h2>

        {/* Profile Info */}
        <div className="flex flex-col md:flex-row items-center gap-6">
          <img
            src={userInfos?.avatar || defaultAvatar}
            alt="User Avatar"
            className="w-24 h-24 rounded-full object-cover border"
          />
          <div className="flex-1 space-y-2">
            <p className="text-gray-700"><strong>Username:</strong> {userInfos?.username}</p>
            <p className="text-gray-700"><strong>Email:</strong> {userInfos?.email}</p>
            <p className="text-gray-700"><strong>Address:</strong> {userInfos?.addressesList?.[0] || "Not set"}</p>
            <p className="text-gray-700"><strong>Credit Balance:</strong> €{userInfos?.creditBalance?.toFixed(2) || "0.00"}</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <button
            onClick={() => setShowDataForm(true)}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
          >
            Edit Profile Info
          </button>

          <button
            onClick={() => setShowPassForm(true)}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
          >
            Change Password
          </button>
        </div>
      </div>

      {/* Modals */}
      <Modal isOpen={showDataForm} onClose={() => setShowDataForm(false)}>
        <UserDataUpdateForm setShowDataForm={setShowDataForm} />
      </Modal>

      <Modal isOpen={showPassForm} onClose={() => setShowPassForm(false)}>
        <UserPassUpdateForm setShowPassForm={setShowPassForm} />
      </Modal>
    </div>
  );
}