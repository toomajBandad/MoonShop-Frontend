import React, { useState } from "react";
import axios from "axios";
import useAuth from "../../hooks/useAuth";

export default function OrderItemCard({ order }) {
  const appUrl = import.meta.env.VITE_BACKEND_URL;
  const { userInfos } = useAuth();
  const [rating, setRating] = useState("");
  const [comment, setComment] = useState("");

  const handleSubmitReview = async (productId) => {
    try {
      await axios.post(`${appUrl}/review`, {
        userId: userInfos._id,
        productId,
        rating: rating,
        comment: comment,
      });
      alert("Review submitted!");
    } catch (err) {
      console.error("Failed to submit review", err);
    }
  };

  return (
    <div
      key={order._id}
      className="border-1 border-gray-200 m-5 flex justify-start items-center w-full md:w-1/2 p-4"
    >
      <img src={order.product.images[0]} className="w-50 p-5" />
      <div className="space-y-4 p-4 max-w-md">
        <div className="font-bold">{order.product.name}</div>
        <div className="text-gray-500">{order.product.desc}</div>

        <div>
          <label
            htmlFor="rating"
            className="block mb-1 text-sm font-medium text-gray-700"
          >
            Rating: (1-5)
          </label>
          <input
            id="rating"
            type="number"
            min="1"
            max="5"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            placeholder="Enter your rating"
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-400 focus:outline-none"
          />
        </div>
        <div>
          <label
            htmlFor="comment"
            className="block mb-1 text-sm font-medium text-gray-700"
          >
            Comment:
          </label>
          <input
            id="comment"
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Write something nice!"
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-400 focus:outline-none"
          />
        </div>
        <button
          className="mt-2 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition cursor-pointer"
          onClick={() => handleSubmitReview(order.product._id)}
        >
          submit
        </button>
      </div>
    </div>
  );
}
