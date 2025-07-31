import { useState } from "react";
import { FaStar } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";

export default function CardInCart({
  item,
  getCartFromServer,
  handleDeleteFromCart,
  updateCartOnServer,
}) {

  const [quantity, setQuantity] = useState(item.quantity);

  const handleIncrement = async () => {
    if (quantity < 20) {
      setQuantity(quantity + 1);
      await updateCartOnServer(item.product._id , quantity + 1);
      await getCartFromServer();
    }
  };

  const handleDecrement = async () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
      await updateCartOnServer(item.product._id , quantity - 1);
      await getCartFromServer();
    }
  };

  return (
    <main className="CardInCart__container px-6 border-b-1 border-gray-300">
      <div className="grid grid-cols-[1fr_2fr] grid-rows-[3fr_1fr] gap-x-4 gap-y-0">
        <div className=" p-2  flex justify-center items-center">
          <img src={item.product.images[0]} className="w-44" />
        </div>
        <div className="flex flex-col p-2 gap-2 justify-center items-start">
          <div className="flex flex-col gap-0">
            <div className="text-xl">{item.product.name}</div>
            <div className="text-gray-500 text-sm">{item.product.desc}</div>
          </div>

          <div className=" text-xs ">
            <span className="bg-gray-200 p-0.5 text-sm">
              Brand : {item.product.brand}
            </span>
          </div>

          <div className=" ">
            <span className="bg-default-red text-white p-0.5 text-sm">
              discount : {item.product.discount}%
            </span>
          </div>
          <div className="flex items-center gap-0.5 text-sm">
            Rating: {item.product.ratings} <FaStar className="text-amber-300" />
          </div>
        </div>
        <div className="p-2 flex justify-center items-center">
          <div className="flex justify-center items-center gap-4 align-baseline border-1 border-gray-400 rounded-lg px-3 py-1  text-default-red">
            <button
              className="cursor-pointer text-2xl "
              onClick={handleDecrement}
            >
              -
            </button>
            {quantity}
            <button
              className="cursor-pointer text-xl"
              onClick={handleIncrement}
            >
              +
            </button>
          </div>
        </div>
        <div className="p-2 text-black flex justify-between items-center">
          <span> Price: {item.product.price} $</span>
          <span
            className="text-gray-500 hover:text-black text-2xl cursor-pointer"
            onClick={() => handleDeleteFromCart(item._id)}
          >
            <MdDeleteOutline />
          </span>
        </div>
      </div>
    </main>
  );
}
