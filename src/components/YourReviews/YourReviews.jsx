import axios from "axios";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { FaStar, FaRegStar, FaStarHalfAlt } from "react-icons/fa";

export default function YourReviews() {
  const appUrl = import.meta.env.VITE_BACKEND_URL;
  const { userInfos } = useAuth();

  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  const [error, setError] = useState(null);

  useEffect(() => {
    if (!userInfos?._id) return;

    axios
      .get(`${appUrl}/review/user/${userInfos._id}`)
      .then((res) => {
        setReviews(res.data);
      })
      .catch((err) => {
        console.error("Failed to fetch reviews", err);
        setError("Failed to load your reviews. Please try again later.");
      })
      .finally(() => setLoading(false));
  }, [appUrl, userInfos._id]);

  function renderStars(rating) {
    const stars = [];

    for (let i = 1; i <= 5; i++) {
      if (rating >= i) {
        stars.push(<FaStar key={i} className="w-5 h-5 text-yellow-400" />);
      } else if (rating >= i - 0.5) {
        stars.push(
          <FaStarHalfAlt key={i} className="w-5 h-5 text-yellow-400" />
        );
      } else {
        stars.push(<FaRegStar key={i} className="w-5 h-5 text-gray-300" />);
      }
    }

    return stars;
  }

  return (
    <div className="YourReviews__container grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
      {loading ? (
        <p>Loading your reviews…</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : reviews.length === 0 ? (
        <p>You don’t have any reviews yet.</p>
      ) : (
        reviews.map((order) => (
          <div
            key={order._id}
            className="flex justify-start items-center border-1 border-gray-200 p-3 gap-3"
          >
            <div className="p-2">
              <img
                src={order.productId.images?.[0] || "/images/notFound.png"}
                alt={order.productId.name}
                className="w-40 object-cover"
              />
            </div>
            <div className="p-2">
              <div className="font-bold">{order.productId.name}</div>
              <div className="mb-3">{order.productId.desc}</div>

                <span className="text-gray-800 font-bold flex gap-2 items-center ">
                  Rate:
                  <div className="flex items-center gap-1 text-yellow-400">
                    <div className="flex items-center gap-1">
                      {renderStars(order.rating)}
                      <span className="ml-2 text-sm text-gray-600">
                        ({order.rating}/5)
                      </span>
                    </div>
                  </div>
                </span>
   
              <div className="text-gray-800 font-bold flex gap-2">
                Comment:
                <span className="text-gray-600 font-medium">
                  {order.comment}
                </span>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
