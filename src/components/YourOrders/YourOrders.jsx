import { useState, useEffect } from "react";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import OrderCard from "../OrderCard/OrderCard";

export default function YourOrders() {
  const appUrl = import.meta.env.VITE_BACKEND_URL;
  const { userInfos } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (userInfos?._id) {
      axios
        .get(`${appUrl}/order/user/${userInfos._id}`)
        .then((res) => {
          setOrders(res.data);
          console.log(res.data);
        })
        .catch((err) => console.error("Failed to fetch orders", err))
        .finally(() => setLoading(false));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInfos?._id]);

  return (
    <div className="YourOrders__container flex flex-col gap-5 mt-5">
      {loading ? (
        <p>Loading your orders…</p>
      ) : orders.length === 0 ? (
        <p>You don’t have any orders yet.</p>
      ) : (
        orders.map((order) => <OrderCard key={order._id} order={order} />)
      )}
    </div>
  );
}
