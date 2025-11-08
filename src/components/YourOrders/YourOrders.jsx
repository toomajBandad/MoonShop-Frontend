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
        })
        .catch((err) => console.error("Failed to fetch orders", err))
        .finally(() => setLoading(false));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInfos?._id]);

  return (
    <div className="YourOrders__container flex flex-col gap-5 mt-5 px-0">
      {loading ? (
        <p className="text-center text-gray-500">Loading your orders…</p>
      ) : orders.length === 0 ? (
        <p className="text-center text-gray-500">
          You don’t have any orders yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {orders.map((order) => (
            <OrderCard key={order._id} order={order} />
          ))}
        </div>
      )}
    </div>
  );
}
