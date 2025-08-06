import { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";
import CardInCart from "../../components/CardInCart/CardInCart";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import { IoIosLock } from "react-icons/io";
import { IoShieldCheckmarkSharp } from "react-icons/io5";
import { AiOutlineFileProtect } from "react-icons/ai";

export default function ShopingCart() {
  const appUrl = import.meta.env.VITE_BACKEND_URL;
  const { userInfos } = useAuth();
  const [cartItems, setCartItems] = useState([]);
  const [cartId, setCartId] = useState([]);
  const [totalPrice, setTotalPrice] = useState(null);
  const { userId } = useParams();

  const { updateCart } = useAuth();

  useEffect(() => {
    getCartFromServer(userId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  const calculateTotalPrice = (items) => {
    let total = 0;
    items.map((item) => {
      total = total + item.quantity * item.product.price;
    });
    setTotalPrice(total);
  };

  const getCartFromServer = () => {
    axios
      .get(`${appUrl}/cart/user/${userId}`)
      .then((response) => {
        setCartItems(response.data.items);
        setCartId(response.data._id);
        calculateTotalPrice(response.data.items);
        updateCart(response.data.items);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const updateCartOnServer = async (productId, Count) => {
    try {
      await axios.put(`${appUrl}/cart/${userId}`, {
        productId: productId,
        quantity: Count,
      });
    } catch (error) {
      console.error("Cart update failed:", error);
    }
  };

  const handleDeleteFromCart = async (itemId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef3f3e",
      cancelButtonColor: "#818285",
      confirmButtonText: "Yes, delete it!",
    })
      .then(async (result) => {
        if (result.isConfirmed) {
          try {
            await updateCartOnServer(itemId, 0);
            await Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
          } catch (error) {
            console.error("Cart update failed:", error);
          }
        }
      })
      .then(() => {
        getCartFromServer();
      });
  };

  const handleClearAllCartItems = async () => {
    console.log(cartId);
    try {
      await axios.delete(`${appUrl}/cart/${cartId}`).then((response) => {
        console.log(response.data);
        getCartFromServer();
      });
    } catch (error) {
      console.error("Cart delete failed:", error);
    }
  };

  const handlePlaceOrder = async () => {
    try {
      const orderData = {
        userId,
        items: cartItems.map((item) => ({
          product: item.product,
          quantity: item.quantity,
          price: item.product.price,
        })),
        shippingAddress: {
          fullName: userInfos.username,
          address: "Rio minio 19",
          city: "Madrid",
          postalCode: "12345",
          country: "Spain",
        },
        paymentMethod: "PayPal",
        totalPrice: "2000",
      };
      console.log(cartItems);

      const response = await axios.post(`${appUrl}/order`, orderData);
      console.log(response);
      handleClearAllCartItems();
      alert("Order placed successfully!");
    } catch (error) {
      console.error("Order creation failed:", error);
      alert("Something went wrong.");
    }
  };

  return (
    <div className="shopingCart__container flex justify-center mt-5">
      <div className="shopingCart__mainWrapper grid grid-cols-[1fr_320px] min-h-screen">
        <div className="shopingCart__main">
          {cartItems?.length === 0 ? (
            <>
              <div className="text-center py-10 text-gray-500 flex justify-center items-center gap-3 w-3xl">
                <div className="text-5xl">🛒</div>
                <div className="flex flex-col justify-center items-center">
                  <span className="text-black text-xl">
                    Your shopping cart is empty
                  </span>
                  <span>Add your favorite items in it.</span>
                </div>
              </div>
              <div className="flex justify-center items-center ">
                <div className="bg-default-softRed text-white p-4 rounded-full cursor-pointer hover:scale-x-103 hover:bg-default-red px-10 transition-all duration-400 ease-in-out">
                  See trending items
                </div>
              </div>
            </>
          ) : (
            cartItems.map((item) => (
              <CardInCart
                item={item}
                key={item._id}
                userId={userId}
                getCartFromServer={getCartFromServer}
                handleDeleteFromCart={handleDeleteFromCart}
                updateCartOnServer={updateCartOnServer}
              />
            ))
          )}
        </div>
        <div className="shopingCart__sider p-4 flex flex-col gap-1.5 border-s-1 border-gray-200">
          <h2 className="text-xl font-bold mb-4">Order Summary</h2>
          <div className="flex justify-between items-center">
            <div>Item(s) total:</div>
            <div>{totalPrice} $</div>
          </div>
          <div className="flex justify-between items-center">
            <div>Total</div>
            <div>{totalPrice} $</div>
          </div>
          <div className="flex justify-center items-center mt-8">
            <div
              className="flex justify-center items-center w-full bg-default-softRed text-white p-4 rounded-full cursor-pointer hover:scale-x-103 hover:bg-default-red transition-all duration-400 ease-in-out"
              onClick={handlePlaceOrder}
            >
              Accept & Checkout
            </div>
          </div>
          <div className="flex justify-center items-center mt-2 mb-5">
            <div className="flex justify-center items-center w-full bg-white p-4 rounded-full cursor-pointer border-2 border-gray-200 hover:border-2 hover:border-gray-500 transition-all duration-400 ease-in-out">
              Express Checkout With PayPal
            </div>
          </div>
          <div>
            <div className="text-gray-600">
              <div className="flex items-center space-x-2 w-full">
                <span>
                  <IoIosLock className="text-2xl text-green-600" />
                </span>

                <span className="text-center">Chargment</span>
              </div>
              <p className="text-sm text-gray-500 mb-5">
                You will not be charged until you review this order on the next
                page
              </p>
              <div className="flex items-center space-x-2 w-full">
                <span>
                  <IoShieldCheckmarkSharp className="text-xl text-green-600" />
                </span>
                <span className="text-center">Safe Payment Options</span>
              </div>
              <p className="text-sm text-gray-500 mb-5">
                Temu is committed to protecting your payment information. We
                follow PCI DSS standards, use strong encryption, and perform
                regular reviews of its system to protect your privacy.
              </p>
              <div className="flex items-center space-x-2 w-full">
                <span>
                  <AiOutlineFileProtect className="text-2xl text-green-600" />
                </span>

                <span className="text-center">Moon Purchase Protection</span>
              </div>
              <p className="text-sm text-gray-500 mb-5">
                Shop confidently on Temu knowing that if something goes wrong,
                we've always got your back. See program terms
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
