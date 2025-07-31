import axios from "axios";
import { useEffect, useState } from "react";

export default function CategoryBar() {
  const appUrl = import.meta.env.VITE_BACKEND_URL;

  const [mainCategoryList, setMainCategoryList] = useState([]);
  //   const [subCategoryList, setSubCategoryList] = useState([]);

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
        // setSubCategoryList(
        //   response.data.filter((category) => category.parentId !== null)
        // );
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  };
  return (
    <div className="CategoryBar__container mt-5 px-10">
      <div className="flex gap-5">
        {mainCategoryList.length &&
          mainCategoryList.map((item) => (
            <div key={item._id} className="border-1 border-gray-300 p-3 rounded-full cursor-pointer shadow-md hover:shadow-xl hover:scale-103 transition-all duration-300"> {item.name}</div>
          ))}
      </div>
    </div>
  );
}
