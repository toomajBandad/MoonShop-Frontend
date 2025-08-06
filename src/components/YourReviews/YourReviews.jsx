import axios from "axios";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";

export default function YourReviews() {
  const appUrl = import.meta.env.VITE_BACKEND_URL;
  const { userInfos } = useAuth();

  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${appUrl}/review/user/${userInfos._id}`)
      .then((res) => {
        setReviews(res.data);
        console.log(res.data);
      })
      .catch((err) => console.error("Failed to fetch orders", err))
      .finally(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="YourReviews__container flex flex-col gap-5 mt-5">
      {loading ? (
        <p>Loading your orders…</p>
      ) : reviews.length === 0 ? (
        <p>You don’t have any orders yet.</p>
      ) : (
        reviews.map((order) => (
          <div key={order._id}>
            <div>{order.rating}</div>
            <div>{order.comment}</div>
            <div>{order.productId.name}</div>
            <div>{order.productId.desc}</div>
          </div>
        ))
      )}
    </div>
  );
}
