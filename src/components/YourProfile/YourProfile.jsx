import "./YourProfile.css";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import axios from "axios";

export default function YourProfile() {
  const navigate = useNavigate();
  const appUrl = import.meta.env.VITE_BACKEND_URL;

  const { logout, userInfos } = useAuth();

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
              text: "Your acount deleted successfully",
              icon: "success",
            });
          })
          .catch((error) => {
            console.error("Axios error:", error);
            Swal.fire({
              title: "Error!",
              text: "Registration failed. Please try again.",
              icon: "error",
            });
          });
      }
    });
  };

  return (
    <div className="yourProfile__container flex flex-col  w-full">
      <div className="flex mt-3 w-full gap-4">
        <div className="w-30">
          <img
            src="./images/logo/LOGO.png"
            alt="Profile"
            className="w-full h-full rounded-full"
          />
        </div>
        <div className="w-full flex flex-col">
          <div>{userInfos && userInfos.username}</div>
          <div>total rivew / helpfull</div>
        </div>
      </div>
      <div className="flex justify-center items-center w-full">
        <button
          className="border-1 cursor-pointer border-default-red text-default-red p-3 hover:bg-default-red hover:text-white"
          onClick={() => deleteUser(userInfos._id)}
        >
          Delete Acount
        </button>
      </div>
    </div>
  );
}
