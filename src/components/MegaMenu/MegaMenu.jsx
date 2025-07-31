import "./MegaMenu.css";
import { LiaLaptopSolid } from "react-icons/lia";
import { IoShirtOutline } from "react-icons/io5";
import { RiSofaLine } from "react-icons/ri";
import { HiOutlineBookOpen } from "react-icons/hi2";
import { MdOutlineHealthAndSafety } from "react-icons/md";
import { IoGameControllerOutline } from "react-icons/io5";
import { FaAngleRight } from "react-icons/fa";
import { useNavigate } from "react-router";
import { useState } from "react";

export default function MegaMenu({ mainCategoryList, subCategoryList }) {
  const [activeMenu, setActiveMenu] = useState(null);

  const navigate = useNavigate();
  const iconMap = {
    "Fashion & Cloths": <IoShirtOutline />,
    "Home & Living": <RiSofaLine />,
    "Books & Media": <HiOutlineBookOpen />,
    "Health & Beauty": <MdOutlineHealthAndSafety />,
    "Gaming & Entertainment": <IoGameControllerOutline />,
    "Electronics & Gadgets": <LiaLaptopSolid />,
  };

  function getCategoryIcon(title) {
    return iconMap[title] || null;
  }

  return (
    <div
      className="MegaMenu__container text-gray-700"
      onMouseLeave={() => setActiveMenu(null)}
    >
      {mainCategoryList &&
        mainCategoryList.map((category) => (
          <div key={category._id}>
            <div
              className="MegaMenu__item flex items-center gap-2 p-4 m-0 cursor-pointer hover:bg-white hover:text-default-softRed transition-all duration-300 relative group"
              onMouseEnter={() => setActiveMenu(category._id)}
            >
              {getCategoryIcon(category.name) || null}
              <h3 className="MegaMenu__title">{category.name}</h3>
            </div>
            {
              /* Submenu */ <div className="submenu absolute top-0 left-full bg-white shadow-md">
                {subCategoryList
                  .filter((item) => item.parentId === category._id)
                  .map(
                    (sub) =>
                      activeMenu === sub.parentId && (
                        <div key={sub._id}>
                          <div className="submenu-item flex items-center gap-2 m-3 px-2 py-0.5 cursor-pointer border-s-2 border-default-red text-black w-64">
                            <span className="MegaMenu__title">{sub.name}</span>
                            <FaAngleRight />
                          </div>

                          <div className="subsubmenu bg-white px-4 group-hover:block">
                            {subCategoryList
                              .filter((ss) => ss.parentId === sub._id)
                              .map((ss) => (
                                <div
                                  onClick={() => {
                                    navigate(`/search/${ss.name}`);
                                    setActiveMenu(null)
                                  }}
                                  key={ss._id}
                                  className="submenu-item px-3 py-1 text-gray-500 w-64"
                                >
                                  <span className="MegaMenu__title">
                                    {ss.name}
                                  </span>
                                </div>
                              ))}
                          </div>
                        </div>
                      )
                  )}
              </div>
            }
          </div>
        ))}
    </div>
  );
}
