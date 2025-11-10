import { NavLink } from "react-router";
import { FaCircle } from "react-icons/fa";
import { CiTimer } from "react-icons/ci";
import { BiCartAdd } from "react-icons/bi";
import { toast } from "react-toastify";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import RenderStars from "../../utils/RenderStars";

export default function ProductCard({ product }) {
  const appUrl = import.meta.env.VITE_BACKEND_URL;
  const { userInfos, updateCart } = useAuth();

  function addProductToCart(e) {
    e.preventDefault();
    addToServerCart(product._id, userInfos._id);
  }

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
    product && (
      <div className="ProductCard__container m-0 p-0 flex h-full flex-col gap-0 text-default-black70 text-sm border-1 border-gray-200 hover:shadow-2xl transition-shadow duration-300 ease-in-out">
        <NavLink className="w-full h-full p-5" to={`/product/${product._id}`}>
          <div className="text-default-red font-bold h-7 text-lg mb-3">
            {product.discount ? "magic sell " : null}
          </div>
          <div className="flex flex-col gap-3">
            <div className="flex justify-center items-center relative">
              <img
                className="w-5/6 h-auto"
                src={product.images[0]}
                alt="Product"
              />
              <div className="top-0 right-0 absolute text-xs">
                <FaCircle />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <div className="">
                <h3 className="font-semibold">{product.name}</h3>
                <p className="line-clamp-3 overflow-hidden text-ellipsis text-gray-500">{product.desc}</p>
              </div>
              <div className="flex justify-between items-center ">
                <div className="flex justify-center items-center my-2">
                  <RenderStars  rating={product.ratings} />
                </div>
                <div className="text-default-gray flex items-center gap-1">
                  fastest send
                  <CiTimer />
                </div>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex gap-2 items-center text-lg">
                  {product.price}$
                  <span className="bg-default-red rounded-md text-white px-1 text-sm">
                    {product.discount}%
                  </span>
                </div>
                <div
                  className="border-1 border-default-red rounded-full px-4 py-1 text-2xl text-default-red hover:bg-default-red hover:text-white"
                  onClick={addProductToCart}
                >
                  <BiCartAdd />
                </div>
              </div>
            </div>
          </div>
        </NavLink>
      </div>
    )
  );
}
