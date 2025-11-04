import { useState, useEffect } from "react";
import axios from "axios";
import { FaStar } from "react-icons/fa";
import useAuth from "../../hooks/useAuth";
import RenderStars from "../../utils/RenderStars";

export default function OrderItemCard({ order }) {
  const appUrl = import.meta.env.VITE_BACKEND_URL;
  const { userInfos } = useAuth();

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [existingReview, setExistingReview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // Fetch existing review
  const fetchReview = async () => {
    try {
      const res = await axios.get(`${appUrl}/review/find`, {
        params: {
          userId: userInfos._id,
          productId: order.product._id,
          orderId: order._id,
        },
      });
      if (res.data) {
        setExistingReview(res.data);
      }
    } catch (err) {
      console.error("Failed to fetch review", err);
    }
  };

  useEffect(() => {
    fetchReview();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [appUrl, userInfos._id, order.product._id, order._id]);

  // Submit new review
  const handleSubmitReview = async (productId) => {
    if (!rating || !comment) {
      alert("Please provide both a rating and a comment.");
      return;
    }

    setIsSubmitting(true);
    try {
      await axios.post(`${appUrl}/review`, {
        userId: userInfos._id,
        productId,
        orderId: order._id,
        rating,
        comment,
      });
      setRating(0);
      setComment("");
      fetchReview();
    } catch (err) {
      console.error("Failed to submit review", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Update existing review
  const handleUpdateReview = async (reviewId) => {
    if (!rating || !comment) {
      alert("Please provide both a rating and a comment.");
      return;
    }

    setIsSubmitting(true);
    try {
      await axios.put(`${appUrl}/review/update/${reviewId}`, {
        rating,
        comment,
      });
      setIsEditing(false);
      fetchReview();
    } catch (err) {
      console.error("Failed to update review", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="border border-gray-200 grid grid-cols-2">
      <div className="py-3 flex flex-col items-center justify-center">
        <div className="font-bold">{order.product.name}</div>
        <img
          src={order.product.images[0]}
          alt={order.product.name}
          className="w-40 h-40 object-cover"
        />
      </div>

      <div className="space-y-2 py-3 px-1 max-w-md">
        <div className="text-gray-500 text-sm line-clamp-3">{order.product.desc}</div>

        {existingReview && !isEditing ? (
          <div className="space-y-2">
            <RenderStars rating={existingReview.rating} />
            <div className="text-gray-600 mt-1">{existingReview.comment}</div>
            <button
              className="text-sm text-indigo-600 underline mt-2 hover:text-indigo-500 hover:cursor-pointer"
              onClick={() => {
                setRating(existingReview.rating);
                setComment(existingReview.comment);
                setIsEditing(true);
              }}
            >
              Edit Review
            </button>
          </div>
        ) : (
          <>
            <div>
              <div className="flex space-x-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <FaStar
                    key={star}
                    onClick={() => setRating(star)}
                    className={`cursor-pointer transition ${
                      rating >= star ? "text-yellow-400" : "text-gray-300"
                    } hover:text-yellow-300`}
                  />
                ))}
              </div>
              {rating > 0 && (
                <div className="text-sm text-gray-600 mt-1">
                  You rated: {rating} star{rating > 1 ? "s" : ""}
                </div>
              )}
            </div>

            <div>
              <label
                htmlFor="comment"
                className="block mb-1 text-sm text-gray-700"
              >
                Comment:
              </label>
              <input
                id="comment"
                type="text"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Write something nice!"
                className="w-full px-2 py-1 text-sm border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-400 focus:outline-none"
              />
            </div>

            <div className="flex gap-2 mt-2">
              <button
                disabled={isSubmitting}
                className={`px-2 py-1 text-sm rounded-md transition cursor-pointer ${
                  isSubmitting
                    ? "bg-gray-400 text-white"
                    : "bg-indigo-600 text-white hover:bg-indigo-700"
                }`}
                onClick={() =>
                  existingReview
                    ? handleUpdateReview(existingReview._id)
                    : handleSubmitReview(order.product._id)
                }
              >
                {isSubmitting
                  ? "Submitting..."
                  : existingReview
                  ? "Save Changes"
                  : "Submit"}
              </button>

              {isEditing && (
                <button
                  className="px-2 py-1 text-sm bg-gray-300 text-black rounded-md"
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
