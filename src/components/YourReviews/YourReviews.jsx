import axios from "axios";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import ReviewCard from "../ReviewCard/ReviewCard";

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


  return (
    <div className="YourReviews__container grid grid-cols-1 lg:grid-cols-2 gap-3 mt-5">
      {loading ? (
        <p>Loading your reviews…</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : reviews.length === 0 ? (
        <p>You don’t have any reviews yet.</p>
      ) : (
        reviews.map((review) => (
          <ReviewCard
            key={review._id}
            review={review}
          />
        ))
      )}
    </div>
  );
}
