import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import OrderItemCard from "../../components/OrderItemCard/OrderItemCard";

export default function Review() {
  const appUrl = import.meta.env.VITE_BACKEND_URL;
  const params = useParams();

  const [loading, setLoading] = useState(true);
  const [orderId, setOrderId] = useState("");
  const [orderItems, setOrderItems] = useState([]);

  useEffect(() => {
    setOrderId(params.id);
  }, [params.id]);

  useEffect(() => {
    orderId &&
      axios
        .get(`${appUrl}/order/${orderId}`)
        .then((res) => {
          setOrderItems(res.data.items);
        })
        .catch((err) => console.error("Failed to fetch orders", err))
        .finally(() => setLoading(false));
  }, [appUrl, orderId]);

  return (
    <div className="YourOrders__container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-10 px-5 xl:px-20">
      {loading ? (
        <p>Loading items ...</p>
      ) : orderItems.length === 0 ? (
        <p>There is no items here</p>
      ) : (
        orderItems.map((order) => (
          <OrderItemCard key={order._id} order={order} />
        ))
      )}
    </div>
  );
}
