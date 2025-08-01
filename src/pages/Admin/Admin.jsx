import { useState } from "react";
import { FaRegListAlt } from "react-icons/fa";
import { MdOutlineReviews } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";
import { RiCoupon3Line } from "react-icons/ri";
import { LuWallet } from "react-icons/lu";
import { LuStore } from "react-icons/lu";
import { MdHistory } from "react-icons/md";
import { GrLocation } from "react-icons/gr";
import YourProfile from "../../components/YourProfile/YourProfile";
import AdminAddProduct from "../../components/AdminAddProduct/AdminAddProduct";
export default function Admin() {
 const [currentMenu, setCurrentMenu] = useState("");

  const listItems = [
    {
      id: 1,
      name: "Add Product",
      icon: <FaRegListAlt name="Add Product" className="text-2xl" />,
    },
    {
      id: 2,
      name: "test Reserve",
      icon: <MdOutlineReviews name="test Reserve" className="text-2xl" />,
    },
    {
      id: 3,
      name: "test Reserve",
      icon: <FaRegUser name="test Reserve" className="text-2xl" />,
    },
    {
      id: 4,
      name: "test Reserve",
      icon: <RiCoupon3Line name="test Reserve" className="text-2xl" />,
    },
    {
      id: 5,
      name: "test Reserve",
      icon: <LuWallet name="test Reserve" className="text-2xl" />,
    },
    {
      id: 6,
      name: "test Reserve",
      icon: <LuStore name="test Reserve" className="text-2xl" />,
    },
    {
      id: 7,
      name: "test Reserve",
      icon: <MdHistory name="test Reserve" className="text-2xl" />,
    },
    {
      id: 8,
      name: "test Reserve",
      icon: <GrLocation name="test Reserve" className="text-2xl" />,
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
        {currentMenu === "Add Product" && <AdminAddProduct />}
      </div>
    </div>
  );
}
