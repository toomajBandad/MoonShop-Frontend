import { useState } from "react";
import { FaRegListAlt } from "react-icons/fa";
import { MdOutlineReviews } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";
import { RiCoupon3Line } from "react-icons/ri";
import { LuWallet } from "react-icons/lu";
import { LuStore } from "react-icons/lu";
import { MdHistory } from "react-icons/md";
import { GrLocation } from "react-icons/gr";
import AdminAddSubCategory from "../../components/AdminAddSubCategory/AdminAddSubCategory";
import AdminEditProduct from "../../templates/AdminEditProduct";
import AdminEditUser from "../../templates/AdminEditUser";
import AdminEditCategory from "../../templates/AdminEditCategory";
export default function Admin() {
  const [currentMenu, setCurrentMenu] = useState("Edit Products");

  const listItems = [
    {
      id: 1,
      name: "Edit Products",
      icon: <FaRegListAlt name="Edit Products" className="text-2xl" />,
    },
    {
      id: 2,
      name: "Edit Users",
      icon: <FaRegUser name="Edit Users" className="text-2xl" />,
    },
    {
      id: 3,
      name: "Edit Categories",
      icon: <MdOutlineReviews name="Edit Categories" className="text-2xl" />,
    },
    {
      id: 4,
      name: "Add Sub Category",
      icon: <FaRegUser name="Add Sub Category" className="text-2xl" />,
    },
    {
      id: 5,
      name: "Edit Review",
      icon: <RiCoupon3Line name="Edit Review" className="text-2xl" />,
    },
    {
      id: 6,
      name: "Edit User",
      icon: <LuWallet name="Edit User" className="text-2xl" />,
    },
    {
      id: 7,
      name: "Edit Cart",
      icon: <LuStore name="Edit Cart" className="text-2xl" />,
    },
    {
      id: 8,
      name: "Edit Order",
      icon: <MdHistory name="Edit Order" className="text-2xl" />,
    },
    {
      id: 9,
      name: "Edit Tag",
      icon: <GrLocation name="Edit Tag" className="text-2xl" />,
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
        {currentMenu === "Edit Products" && <AdminEditProduct />}
        {currentMenu === "Edit Users" && <AdminEditUser />}
        {currentMenu === "Edit Categories" && <AdminEditCategory />}
        {currentMenu === "Add Sub Category" && <AdminAddSubCategory />}
      </div>
    </div>
  );
}
