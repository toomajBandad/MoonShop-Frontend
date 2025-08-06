import { Navigate, useNavigate } from "react-router";

export default function OrderCard({ order }) {
  const navigate = useNavigate();

  return (
    <div className="order__container border-1 border-gray-300">
      <div className="order__header flex justify-between bg-gray-200 p-3">
        <h2>{order.status}</h2>
        <div className="cursor-pointer">View Order details</div>
      </div>

      <div className="order__body flex justify-center items-center w-full p-3">
        <div className="w-full flex gap-2">
          {order.items.map((item) => (
            <div key={item._id} className="w-30 border-1 border-gray-300">
              <img src={item.product.images[0]} />
            </div>
          ))}
        </div>
        <div className="flex flex-col justify-center gap-2 w-64">
          <button className="bg-default-red py-1 text-white rounded-full cursor-pointer hover:scale-105 transition-all ease-in-out duration-300">
            Track
          </button>
          <button
            className="bg-white py-1 border-1 border-default-red text-default-red rounded-full cursor-pointer hover:bg-default-red hover:text-white transition-all ease-in-out duration-300"
            onClick={() => {
              navigate(`/review/${order._id}`);
            }}
          >
            Leave a review
          </button>
          <button className="bg-white py-1 border-1 border-default-red text-default-red rounded-full cursor-pointer hover:bg-default-red hover:text-white transition-all ease-in-out duration-300">
            Return/Refund
          </button>
          <button className="bg-white py-1 border-1 border-default-red text-default-red rounded-full cursor-pointer hover:bg-default-red hover:text-white transition-all ease-in-out duration-300">
            Buy this again
          </button>
        </div>
      </div>

      <div className="flex gap-8 p-3 border-t-1 border-gray-300 text-gray-500">
        <span>
          {order.items.length} items: {order.totalPrice}$
        </span>
        <span> Order Time: {order.createdAt}</span>
        <span>Order ID: {order._id}</span>
      </div>
    </div>
  );
}
