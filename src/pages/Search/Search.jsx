import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductCard from "../../components/ProductCard/ProductCard";
import { FaChevronDown } from "react-icons/fa";

export default function Search() {
  const appUrl = import.meta.env.VITE_BACKEND_URL;
  const params = useParams();

  const [productList, setProductList] = useState([]);

  const colorOptions = ["All", "White", "Black", "Gray"];
  const [selectedColor, setSelectedColor] = useState("All");
  const [isColorOpen, setIsColorOpen] = useState(false);

  const lowPriceOptions = ["0", "150", "300", "450","600" , "750", "900" , "1050", "1200","1350" , "1500"];
  const [selectedLowPrice, setSelectedLowPrice] = useState("0");
  const [isLowPriceOpen, setIsLowPriceOpen] = useState(false);

  const highPriceOptions = ["100", "250", "400", "550","700","850","1000","1150","1300","1450","1600"];
  const [selectedHighPrice, setSelectedHighPrice] = useState("1600");
  const [isHighPriceOpen, setIsHighPriceOpen] = useState(false);

  useEffect(() => {
    if (params.param.includes("tag-")) {
      getProductByTagFromServer();
      console.log("tag");
    } else {
      getProductFromServer();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  function getProductFromServer() {
    axios
      .get(`${appUrl}/product/byCat/${params.param}`)
      .then((response) => {
        setProductList(response.data.productList);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }
  function getProductByTagFromServer() {
    let cleanString = decodeURIComponent(params.param.replace("tag-", ""));

    axios
      .get(`${appUrl}/product/byTag/${cleanString}`)
      .then((response) => {
        console.log(response);

        setProductList(response.data.productList);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }

  const filteredList = productList.filter((product) => {
    const matchesColor =
      selectedColor === "All" || product.color === selectedColor;
    const matchesLowPrice = product.price >= Number(selectedLowPrice);
    const matchesHighPrice = product.price <= Number(selectedHighPrice);

    return matchesColor && matchesLowPrice && matchesHighPrice;
  });

  return (
    <div className="flex px-0">
      <div className="sidebar__filter w-88 bg-gray-100 flex flex-col">
        <div className="colorSelect__wrapper">
          <div className="relative mx-5">
            <span>Choose Color : </span>
            <button
              onClick={() => setIsColorOpen(!isColorOpen)}
              className="w-full flex justify-between px-4 py-2 border border-gray-300 bg-white rounded-md text-left"
            >
              {selectedColor || "Select a color"}
              <FaChevronDown />
            </button>

            {isColorOpen && (
              <ul className="absolute mt-1 w-full bg-white border border-gray-300 rounded-md shadow-md z-10">
                {colorOptions.map((color) => (
                  <li
                    key={color}
                    onClick={() => {
                      setSelectedColor(color);
                      setIsColorOpen(false);
                    }}
                    className="px-4 py-2 hover:bg-red-500  hover:text-white cursor-pointer"
                  >
                    {color}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div className="lowPriceSelect__wrapper">
          <div className="relative mx-5">
            <span>Choose Low Price : </span>
            <button
              onClick={() => setIsLowPriceOpen(!isLowPriceOpen)}
              className="w-full flex justify-between px-4 py-2 border border-gray-300 bg-white rounded-md text-left"
            >
              {selectedLowPrice || "Select Price"}
              <FaChevronDown />
            </button>

            {isLowPriceOpen && (
              <ul className="absolute mt-1 w-full bg-white border border-gray-300 rounded-md shadow-md z-10">
                {lowPriceOptions.map((price) => (
                  <li
                    key={price}
                    onClick={() => {
                      setSelectedLowPrice(price);
                      setIsLowPriceOpen(false);
                    }}
                    className="px-4 py-2 hover:bg-red-500  hover:text-white cursor-pointer"
                  >
                    {price}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div className="highPriceSelect__wrapper">
          <div className="relative mx-5">
            <span>Choose High Price : </span>
            <button
              onClick={() => setIsHighPriceOpen(!isHighPriceOpen)}
              className="w-full flex justify-between px-4 py-2 border border-gray-300 bg-white rounded-md text-left"
            >
              {selectedHighPrice || "Select Price"}
              <FaChevronDown />
            </button>

            {isHighPriceOpen && (
              <ul className="absolute mt-1 w-full bg-white border border-gray-300 rounded-md shadow-md z-10">
                {highPriceOptions.map((price) => (
                  <li
                    key={price}
                    onClick={() => {
                      setSelectedHighPrice(price);
                      setIsHighPriceOpen(false);
                    }}
                    className="px-4 py-2 hover:bg-red-500  hover:text-white cursor-pointer"
                  >
                    {price}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
      <div className="w-full grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-0 p-0">
        {filteredList.length > 0 ? (
          filteredList.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))
        ) : (
          <div className="text-center w-full p-8">No products found</div>
        )}
      </div>
    </div>
  );
}
