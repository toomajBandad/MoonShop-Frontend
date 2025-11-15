import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import CartCardTiny from "../components/CartCardTiny/CartCardTiny";

export default function AdminEditCart() {
  const appUrl = import.meta.env.VITE_BACKEND_URL;

  const [carts, setCarts] = useState([]);
  const [loading, setLoading] = useState(true);

  const refreshCarts = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${appUrl}/cart/all`);
      console.log(response.data);
      
      setCarts(response.data);
    } catch (error) {
      console.error("Error fetching carts:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshCarts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="p-5 md:p-10">
      {loading ? (
        <p className="text-gray-600">Loading carts...</p>
      ) : (
        <div>
          {carts.length === 0 ? (
            <p className="text-gray-500">No carts available.</p>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-2">
              {carts.map((cart) => (
                <CartCardTiny
                  key={cart._id}
                  cart={cart}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
