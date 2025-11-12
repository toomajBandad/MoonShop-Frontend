import axios from "axios";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import ReviewCard from "../ReviewCard/ReviewCard";

export default function UserReviews() {
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

  return (
    <div className="YourReviews__container px-0 mt-5">
      {loading ? (
        <p className="text-center text-gray-500">Loading your reviews…</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : reviews.length === 0 ? (
        <p className="text-center text-gray-500">You don’t have any reviews yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-2">
          {reviews.map((review) => (
            <ReviewCard key={review._id} review={review} />
          ))}
        </div>
      )}
    </div>
  );
}