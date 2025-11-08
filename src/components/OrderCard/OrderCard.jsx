import { useNavigate } from "react-router";

export default function OrderCard({ order }) {
  const navigate = useNavigate();

  return (
    <div className="order__container border border-gray-300 rounded-md shadow-sm text-sm w-full">
      {/* Header */}
      <div className="order__header flex justify-between items-center bg-gray-200 p-4 rounded-t-md">
        <h2 className="font-semibold text-gray-700">Status: {order.status}</h2>
        <div className="text-blue-600 cursor-pointer hover:underline">View Order details</div>
      </div>

      {/* Body */}
      <div className="order__body flex flex-col lg:flex-row justify-between items-start w-full p-3 gap-0">
        {/* Items */}
        <div className="flex flex-wrap gap-0 w-full lg:w-2/3">
          {order.items.map((item) => (
            <div key={item._id} className="w-24 h-24 border border-gray-300 overflow-hidden">
              <img
                src={item.product?.images[0]}
                alt="Product"
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-2 w-full lg:w-1/3">
          <button className="bg-default-red py-2 text-white rounded-full hover:scale-105 transition text-sm">
            Track
          </button>
          <button
            className="bg-white py-2 border border-default-red text-default-red rounded-full hover:bg-default-red hover:text-white transition text-sm"
            onClick={() => navigate(`/review/${order._id}`)}
          >
            Leave a review
          </button>
          <button className="bg-white py-2 border border-default-red text-default-red rounded-full hover:bg-default-red hover:text-white transition text-sm">
            Return / Refund
          </button>
          <button className="bg-white py-2 border border-default-red text-default-red rounded-full hover:bg-default-red hover:text-white transition text-sm">
            Buy This Again
          </button>
        </div>
      </div>

      {/* Footer */}
      <div className="flex flex-col sm:flex-row gap-4 p-4 border-t border-gray-300 text-gray-600 text-sm">
        <span>{order.items.length} items: ${order.totalPrice}</span>
        <span>Order Time: {new Date(order.createdAt).toLocaleString()}</span>
      </div>
    </div>
  );
}