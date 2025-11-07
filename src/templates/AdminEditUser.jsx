import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import UserTinyCard from "../components/UserTinyCard/UserTinyCard";
import EditUserForm from "../components/EditUserForm/EditUserForm";
import { toast } from "react-toastify";

export default function AdminEditUser() {
  const appUrl = import.meta.env.VITE_BACKEND_URL;

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showEditUserForm, setShowEditUserForm] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const refreshUsers = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${appUrl}/user/all`);
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching Users:", error);
    } finally {
      setLoading(false);
    }
  };

  function editUserInfos(user) {
    setSelectedUser(user);
    setShowEditUserForm(true);
  }

  function deleteUser(user) {
    Swal.fire({
      title: "Are you sure?",
      text: `Do you really want to delete "${user.username}"?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`${appUrl}/user/${user._id}`);
          Swal.fire("Deleted!", "User has been deleted.", "success");
          refreshUsers();
        } catch (error) {
          console.error("Delete failed:", error);
          Swal.fire("Error", "Failed to delete User.", "error");
        }
      }
    });
  }

  useEffect(() => {
    refreshUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="p-5 md:p-10">
      {showEditUserForm && selectedUser ? (
        <EditUserForm
          user={selectedUser}
          setShowEditUserForm={setShowEditUserForm}
          onUserUpdated={() => {
            setShowEditUserForm(false);
            setSelectedUser(null);
            refreshUsers();
            toast.success("User updated successfully!");
          }}
        />
      ) : (
        <>
          {loading ? (
            <p className="text-gray-600">Loading Users...</p>
          ) : (
            <div>
              {users.length === 0 ? (
                <p className="text-gray-500">No Users available.</p>
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-2">
                  {users.map((user) => (
                    <UserTinyCard
                      key={user._id}
                      user={user}
                      onRemove={deleteUser}
                      onEdit={editUserInfos}
                    />
                  ))}
                </div>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}
