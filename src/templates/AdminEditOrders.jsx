import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import OrderCardTiny from "../components/OrderCardTiny/OrderCardTiny";

export default function AdminEditOrders() {
  const appUrl = import.meta.env.VITE_BACKEND_URL;

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const refreshOrders = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${appUrl}/order/all`);
      setOrders(response.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };


  function deleteOrder(order) {
    Swal.fire({
      title: "Are you sure?",
      text: `Do you really want to delete "${order.name}"?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`${appUrl}/order/${order._id}`);
          Swal.fire("Deleted!", "Order has been deleted.", "success");
          refreshOrders();
        } catch (error) {
          console.error("Delete failed:", error);
          Swal.fire("Error", "Failed to delete order.", "error");
        }
      }
    });
  }

  useEffect(() => {
    refreshOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="p-5 md:p-10">
      {loading ? (
        <p className="text-gray-600">Loading orders...</p>
      ) : (
        <div>
          {orders.length === 0 ? (
            <p className="text-gray-500">No orders available.</p>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-2">
              {orders.map((order) => (
                <OrderCardTiny
                  key={order._id}
                  order={order}
                  onRemove={deleteOrder}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
