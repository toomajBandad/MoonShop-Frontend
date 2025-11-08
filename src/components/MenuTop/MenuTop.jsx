import { IoIosMenu } from "react-icons/io";
import { BiSolidOffer } from "react-icons/bi";
import { FaFire } from "react-icons/fa";
import { AiFillLike } from "react-icons/ai";
import { NavLink } from "react-router-dom";
import MegaMenu from "../MegaMenu/MegaMenu";
import { useEffect, useState } from "react";
import axios from "axios";

export default function MenuTop() {
  const appUrl = import.meta.env.VITE_BACKEND_URL;
  const [mainCategoryList, setMainCategoryList] = useState([]);
  const [subCategoryList, setSubCategoryList] = useState([]);
  const menuItems = [
    { id: 2, name: "Offers", icon: <BiSolidOffer />, path: "/" },
    { id: 3, name: "Popular", icon: <FaFire />, path: "/" },
    { id: 4, name: "Best sellers", icon: <AiFillLike /> },
  ];

  useEffect(() => {
    getCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getCategories = () => {
    axios
      .get(`${appUrl}/category`)
      .then((response) => {
        setMainCategoryList(
          response.data.filter((category) => category.parentId === null)
        );
        setSubCategoryList(
          response.data.filter((category) => category.parentId !== null)
        );
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  };
  return (
    <div className="MenuTop__container bg-white text-gray-500 shadow-md">
      <div className="MenuTop__list flex justify-start gap-2 items-center p-0">
        <div className="MenuTop__item cursor-pointer flex justify-center items-center gap-1.5 py-2 px-4 relative group border-b-2 border-amber-50 hover:border-b-2 hover:border-default-softRed transition-all duration-300">
          <IoIosMenu /> Categories
          <div className="megaMenu absolute top-10 left-0 w-64 hidden bg-gray-100 group-hover:block border-1 border-gray-300 z-30">
            <MegaMenu
              mainCategoryList={mainCategoryList}
              subCategoryList={subCategoryList}
            />
          </div>
        </div>
        {menuItems.map((item) => (
          <NavLink key={item.id} to={item.path}>
            <div className="MenuTop__item cursor-pointer flex justify-center items-center gap-1.5 py-2 px-4 border-b-2 border-amber-50 hover:border-b-2 hover:border-default-softRed transition-all duration-300">
              {item.icon}
              {item.name}
            </div>
          </NavLink>
        ))}
      </div>
    </div>
  );
}
