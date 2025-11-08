import { MdLaptop } from "react-icons/md";
import { IoShirtOutline, IoGameControllerOutline } from "react-icons/io5";
import { RiSofaLine } from "react-icons/ri";
import { HiOutlineBookOpen } from "react-icons/hi2";
import { MdOutlineHealthAndSafety } from "react-icons/md";
import { FaAngleRight } from "react-icons/fa";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";

export default function MegaMenu({ mainCategoryList, subCategoryList }) {
  const [activeMenu, setActiveMenu] = useState(null);
  const [activeSubItems, setActiveSubItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (activeMenu) {
      const filtered = subCategoryList.filter(
        (item) => item.parentId._id === activeMenu
      );
      setActiveSubItems(filtered);
    } else {
      setActiveSubItems([]);
    }
  }, [activeMenu, subCategoryList]);

  const iconMap = {
    "Fashion & Cloths": <IoShirtOutline />,
    "Home & Living": <RiSofaLine />,
    "Books & Media": <HiOutlineBookOpen />,
    "Health & Beauty": <MdOutlineHealthAndSafety />,
    "Gaming & Entertainment": <IoGameControllerOutline />,
    "Electronics & Gadgets": <MdLaptop />,
  };

  function getCategoryIcon(title) {
    return iconMap[title] || null;
  }

  return (
    <div
      className="MegaMenu__container relative flex text-gray-700"
      onMouseLeave={() => setActiveMenu(null)}
    >
      {/* Main Categories */}
      <div className="flex flex-col">
        {mainCategoryList?.map((category) => (
          <div
            key={category._id}
            className="MegaMenu__item flex items-center gap-2 p-4 cursor-pointer hover:bg-white hover:text-red-500 transition-all duration-300"
            onMouseEnter={() => setActiveMenu(category._id)}
          >
            {getCategoryIcon(category.name)}
            <h3 className="MegaMenu__title">{category.name}</h3>
          </div>
        ))}
      </div>

      {/* Submenu aligned to top right */}
      {activeSubItems.length > 0 && (
        <div className="absolute top-0 left-full bg-white shadow-md z-10 p-4 min-w-[250px]">
          {activeSubItems.map((sub) => (
            <div key={sub._id} className="mb-2">
              <div className="submenu-item flex items-center gap-2 px-2 py-1 cursor-pointer border-l-2 border-red-500 text-black hover:bg-gray-50">
                <span className="MegaMenu__title">{sub.name}</span>
                <FaAngleRight />
              </div>

              <div className="pl-4">
                {subCategoryList
                  .filter((ss) => ss.parentId._id === sub._id)
                  .map((ss) => (
                    <div
                      key={ss._id}
                      onClick={() => {
                        navigate(`/search/?category=${ss.name}`);
                        setActiveMenu(null);
                      }}
                      className="submenu-item px-3 py-1 text-gray-500 hover:text-red-500 cursor-pointer"
                    >
                      {ss.name}
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}