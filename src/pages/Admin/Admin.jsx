import { useState } from "react";

import { BsBoxSeam } from "react-icons/bs";
import { LuUsersRound } from "react-icons/lu";
import { BiCategory } from "react-icons/bi";
import { BsTags } from "react-icons/bs";
import { FiShoppingCart } from "react-icons/fi";
import { MdOutlineReviews } from "react-icons/md";

import AdminEditProduct from "../../templates/AdminEditProduct";
import AdminEditUser from "../../templates/AdminEditUser";
import AdminEditCategory from "../../templates/AdminEditCategory";
import AdminEditTags from "../../templates/AdminEditTags";
export default function Admin() {
  const [currentMenu, setCurrentMenu] = useState("Edit Products");

  const listItems = [
    {
      id: 1,
      name: "Edit Products",
      icon: <BsBoxSeam name="Edit Products" className="text-2xl" />,
    },
    {
      id: 2,
      name: "Edit Users",
      icon: <LuUsersRound name="Edit Users" className="text-2xl" />,
    },
    {
      id: 3,
      name: "Edit Categories",
      icon: <BiCategory name="Edit Categories" className="text-2xl" />,
    },
    {
      id: 4,
      name: "Edit Reviews",
      icon: <MdOutlineReviews name="Edit Reviews" className="text-2xl" />,
    },
    {
      id: 5,
      name: "Edit Carts",
      icon: <FiShoppingCart name="Edit Carts" className="text-2xl" />,
    },
    {
      id: 6,
      name: "Edit Orders",
      icon: <FiShoppingCart name="Edit Orders" className="text-2xl" />,
    },
    {
      id: 7,
      name: "Edit Tags",
      icon: <BsTags name="Edit Tags" className="text-2xl" />,
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
        {currentMenu === "Edit Tags" && <AdminEditTags />}
      </div>
    </div>
  );
}
