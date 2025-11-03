import React from "react";
import { IoMdHeartEmpty } from "react-icons/io";
import { IoMdShare } from "react-icons/io";
import { PiBellRingingBold } from "react-icons/pi";
import { FaChartLine } from "react-icons/fa6";
import { MdCompare } from "react-icons/md";
import { MdPlaylistAdd } from "react-icons/md";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useParams } from "react-router";
import useAuth from "../../hooks/useAuth";
import { FaStar } from "react-icons/fa";
import RenderStars from "../../utils/RenderStars";

export default function Product() {
  const appUrl = import.meta.env.VITE_BACKEND_URL;
  const { userInfos, updateCart } = useAuth();
  const params = useParams();
  const [productData, setProductData] = useState(null);
  const [mainImage, setMainImage] = useState(null);

  useEffect(() => {
    getProductDataFromServer();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  useEffect(() => {
    productData && setMainImage(productData.images[0]);
  }, [productData]);

  function getProductDataFromServer() {
    params &&
      axios
        .get(`${appUrl}/product/byId/${params.id}`)
        .then((response) => {
          setProductData(response.data.product);
        })
        .catch((error) => {
          console.error("Error fetching products:", error);
        });
  }

  const changeMainImage = (index) => {
    setMainImage(productData.images[index]);
  };

  const addToServerCart = async (productId, userId) => {
    let quantity = 1;
    if ((userId, productId, quantity)) {
      try {
        const response = await axios.post(`${appUrl}/cart/add`, {
          userId,
          productId,
          quantity,
        });
        showToast("Added to Your Basket successfully!", "success");
        updateCart(response.data.cart.items);
      } catch (err) {
        console.error("Error adding to cart:", err);
        showToast("Error in adding item to basket!", "error");
      }
    }
  };

  const showToast = (text, state) => {
    if (state === "success") {
      toast.success(text, {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        progressStyle: { background: "#4CAF50" },
        className: "toast",
      });
    } else {
      toast.error(text, {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        progressStyle: { background: "#ef3f3e" },
        className: "toast",
      });
    }
  };

  return (
    productData && (
      <div className="Product__container px-10 m-0 mt-20 flex gap-5">
        <div className="product__leftSide w-2/5">
          <div className="imageIcons__wrapper relative">
            <img src={mainImage} className="w-full p-3" alt="productImg" />
            <div className="flex flex-col gap-5 text-2xl absolute top-0 left-0">
              <IoMdHeartEmpty className="cursor-pointer hover:text-black" />
              <IoMdShare className="cursor-pointer hover:text-black" />
              <PiBellRingingBold className="cursor-pointer hover:text-black" />
              <FaChartLine className="cursor-pointer hover:text-black" />
              <MdCompare className="cursor-pointer hover:text-black" />
              <MdPlaylistAdd className="cursor-pointer hover:text-black" />
            </div>
          </div>

          <div className="excuses__wrapper"></div>
        </div>
        <div className="product__rightSide w-3/5 flex flex-col justify-center">
          <div>
            <div className="text-2xl"> {productData.name}</div>
            <div className="text-lg text-gray-600 border-b-1 border-gray-300 pb-4">
              {productData.desc}
            </div>
          </div>
          <div className="product__datas flex flex-col mt-5 gap-5 p-5">
            <div className="flex flex-row items-center gap-4">
              <div className="flex items-center gap-1">
                Customers rating :
                <RenderStars rating={productData.ratings} />{" "}
                {productData.ratings}
              </div>
              <div className="bg-gray-200 px-2 rounded-2xl cursor-pointer hover:bg-gray-300">
                reviews
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <div>Characteristics : </div>
              <div className="flex gap-2">
                {productData.tags.length !== 0 &&
                  productData.tags.map((item) => (
                    <span
                      className="bg-gray-200 p-5 rounded-2xl"
                      key={item._id}
                    >
                      {item.name}
                    </span>
                  ))}
              </div>
            </div>
            <div className="flex flex-row gap-5 border-t-1 border-gray-300 pt-5">
              <div className="font-bold">Price : {productData.price} $ </div>
              <div className="bg-gray-500 text-white px-3">
                {productData.stock} Left
              </div>
            </div>
            <div className="flex flex-row gap-5">
              <button
                onClick={() => addToServerCart(params.id, userInfos._id)}
                className="font-bold bg-default-red text-white px-3 py-2 w-64 rounded-4xl cursor-pointer hover:scale-105 hover:shadow-lg transition-all duration-300 ease-in-out"
              >
                Add to cart
              </button>
            </div>

            <div className="imageAlbum__wrapper flex gap-2 overflow-hidden mt-10">
              {productData.images?.map((item, index) => (
                <img
                  key={index}
                  src={item}
                  alt="album"
                  className="w-20 border-1 border-gray-200 rounded-lg cursor-pointer"
                  onClick={() => changeMainImage(index)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  );
}
