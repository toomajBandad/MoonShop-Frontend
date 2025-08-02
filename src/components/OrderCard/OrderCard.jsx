import React, { useEffect } from "react";

export default function OrderCard({ order }) {
  useEffect(() => {
    console.log(order);
  }, []);

  return (
    <div className="order__container border-1 border-gray-300">
      <div className="order__header flex justify-between bg-gray-200 p-3">
        <h2>{order.status}</h2>
        <div className="cursor-pointer">View Order details</div>
      </div>

      <div className="order__body flex justify-center items-center w-full p-3">
        <div className="w-full">test</div>
        <div className="flex flex-col justify-center gap-2 w-64">
          <button className="bg-default-red py-1 text-white rounded-full">
            Track
          </button>
          <button className="bg-default-red py-1 text-white rounded-full">
            Leave a review
          </button>
          <button className="bg-default-red py-1 text-white rounded-full">
            Return/Refund
          </button>
          <button className="bg-default-red py-1 text-white rounded-full">
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
