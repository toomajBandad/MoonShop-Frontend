import "./Topbar.css";
import { LuShoppingCart } from "react-icons/lu";
import { MdLogin } from "react-icons/md";
import { useNavigate } from "react-router";
import logoImg from "/images/logo/LOGO.png";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import { useEffect, useState } from "react";
import SearchBar from "../SearchBar/SearchBar";

export default function Topbar() {
  const navigate = useNavigate();
  const { isLoggedIn, logout, userInfos, cartInfo } = useAuth();
  const [cartTotalQuantity, setCartTotalQuantity] = useState(0);

  useEffect(() => {
    let totalQuantity = 0;

    cartInfo?.forEach((item) => {
      totalQuantity += item.quantity;
    });
    setCartTotalQuantity(totalQuantity);
  }, [cartInfo]);

  const userLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You are going to log out.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ed1944",
      cancelButtonColor: "#818285",
      confirmButtonText: "Yes, logout!",
    }).then((result) => {
      if (result.isConfirmed) {
        logout();
        navigate("/");
        Swal.fire({
          title: "Success!",
          text: "You have successfully logged out.",
          icon: "success",
        });
      }
    });
  };

  return (
    <div className="topbar__container w-full flex justify-between items-center py-4 px-10 shadow-md">
      <div className="topbar__left flex gap-8">
        <div className="topbar__left__logoWrapper flex items-center justify-center cursor-pointer">
          <img className="w-36" src={logoImg} onClick={() => navigate("/")} />
        </div>
        <SearchBar />
      </div>
      <div className="topbar__right flex items-center justify-center gap-8 ">
        <div className="relative  group">
          {isLoggedIn ? (
            <div className="topbar__right__loginWrapper flex items-center justify-center border-gray-500 border-1 px-4 py-2 rounded-lg text-gray-500 gap-2 cursor-pointer">
              {userInfos.username}
            </div>
          ) : (
            <div
              className="topbar__right__loginWrapper flex items-center justify-center border-gray-500 border-1 px-4 py-2 rounded-lg text-gray-500 gap-2 cursor-pointer"
              onClick={() => navigate("/login")}
            >
              <MdLogin />
              Login | Register
            </div>
          )}

          {isLoggedIn && (
            <div className="userMenu top-10 left-0 w-full bg-white shadow-lg rounded-lg p-4 absolute hidden group-hover:block">
              {isLoggedIn && (
                <div className="userMenu__dropdown bg-white p-4">
                  <div
                    className="userMenu__item cursor-pointer"
                    onClick={() => navigate("/profile")}
                  >
                    Profile
                  </div>
                  <div
                    className="userMenu__item cursor-pointer"
                    onClick={() => {
                      userLogout();
                    }}
                  >
                    Logout
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
        <div
          className="topbar__right__basketWrapper flex items-center justify-center cursor-pointer relative"
          onClick={() => navigate(`/shopingCart/${userInfos._id}`)}
        >
          <LuShoppingCart className="text-2xl" />
          <span className="basketBadge bg-default-softRed px-1 text-xs rounded-full text-white absolute bottom-3 left-4">
            {cartTotalQuantity}
          </span>
        </div>
      </div>
    </div>
  );
}
