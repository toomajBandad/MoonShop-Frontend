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
          console.log(res.data.items);
        })
        .catch((err) => console.error("Failed to fetch orders", err))
        .finally(() => setLoading(false));
  }, [appUrl, orderId]);

  return (
    <div className="YourOrders__container flex gap-5 mt-5">
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
