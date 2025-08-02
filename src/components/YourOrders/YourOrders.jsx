import { useState, useEffect } from "react";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import OrderCard from "../OrderCard/OrderCard";

export default function YourOrders() {
  const appUrl = import.meta.env.VITE_BACKEND_URL;
  const { userInfos } = useAuth();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios
      .get(`${appUrl}/order/user/${userInfos._id}`)
      .then((res) => setOrders(res.data))
      .catch((err) => console.error("Failed to fetch orders", err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="YourOrders__container">
      {orders.map((order) => (
        <OrderCard key={order._id} order={order} />
      ))}
    </div>
  );
}
