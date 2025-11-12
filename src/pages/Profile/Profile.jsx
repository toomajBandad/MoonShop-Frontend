import { useState } from "react";
import "./Profile.css";
import { FaRegListAlt } from "react-icons/fa";
import { MdOutlineReviews } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";
import { RiCoupon3Line } from "react-icons/ri";
import { LuWallet } from "react-icons/lu";
import { LuStore } from "react-icons/lu";
import { MdHistory } from "react-icons/md";
import { GrLocation } from "react-icons/gr";
import UserProfile from "../../components/UserProfile/UserProfile";
import UserOrders from "../../components/UserOrders/UserOrders";
import UserReviews from "../../components/UserReviews/UserReviews";

export default function Profile() {
  const [currentMenu, setCurrentMenu] = useState("User profile");

  const listItems = [
    {
      id: 1,
      name: "User profile",
      icon: <FaRegUser name="Your profile" className="text-2xl" />,
    },
    {
      id: 2,
      name: "User orders",
      icon: <FaRegListAlt name="Your orders" className="text-2xl" />,
    },
    {
      id: 3,
      name: "User reviews",
      icon: <MdOutlineReviews name="Your reviews" className="text-2xl" />,
    },

    {
      id: 4,
      name: "Coupons & offers",
      icon: <RiCoupon3Line name="Coupons & offers" className="text-2xl" />,
    },
    {
      id: 5,
      name: "Credit Balance",
      icon: <LuWallet name="Credit Balance" className="text-2xl" />,
    },
    {
      id: 6,
      name: "Followed stores",
      icon: <LuStore name=" Followed stores" className="text-2xl" />,
    },
    {
      id: 7,
      name: "Browsing history",
      icon: <MdHistory name="Browsing history" className="text-2xl" />,
    },
    {
      id: 8,
      name: "Addresses",
      icon: <GrLocation name="Addresses" className="text-2xl" />,
    },
  ];

  return (
    <div className="profile__container flex items-start justify-star w-full px-9">
      <div className="profile__sider w-80 h-full flex items-start justify-start">
        <ul className="sider__menu flex flex-col gap-5 items-start justify-start h-full w-full p-4 font-semibold border-r-1 border-gray-300 cursor-pointer mt-10">
          {listItems.map((item) => (
            <li
              key={item.id}
              className={
                currentMenu === item.name ? "sider__item active" : "sider__item"
              }
              name={item.name}
              onClick={(event) => {
                setCurrentMenu(event.target.getAttribute("name"));
              }}
            >
              {item.icon}
              {item.name}
            </li>
          ))}
        </ul>
      </div>
      <div className="profile__main w-full px-4">
        {currentMenu === "User profile" && <UserProfile />}
        {currentMenu === "User orders" && <UserOrders />}
        {currentMenu === "User reviews" && <UserReviews />}
      </div>
    </div>
  );
}
