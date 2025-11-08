import { FaTrash, FaEdit, FaEye } from "react-icons/fa";
import { MdReceiptLong } from "react-icons/md";
import Swal from "sweetalert2";

export default function OrderCardTiny({ order, onRemove }) {
  const itemCount =
    order.items?.reduce((sum, item) => sum + item.quantity, 0) || 0;
  const orderDate = new Date(order.createdAt).toLocaleDateString();

  // Conditional styling based on order status
  let borderColor = "border-gray-300";
  let shadow = "shadow-sm";
  let shadowColor = "shadow-gray-200";

  if (order.isPaid && order.isDelivered) {
    borderColor = "border-green-400";
    shadow = "shadow-md";
    shadowColor = "shadow-green-400";
  } else if (order.isPaid && !order.isDelivered) {
    borderColor = "border-blue-400";
    shadow = "shadow-md";
    shadowColor = "shadow-blue-400";
  }

  const handleShowProducts = () => {
    const productList = order.items
      .map((item, index) => {
        const name = item.product?.name || `Product ${index + 1}`;
        return `<li><strong>${name}</strong> — ${item.quantity} × $${item.price}</li>`;
      })
      .join("");

    Swal.fire({
      title: `Products in Order #${order._id.slice(-6)}`,
      html: `<ul style="text-align:left; padding-left:1em;">${productList}</ul>`,
      confirmButtonText: "Close",
    });
  };

  return (
    <div
      className={`flex items-center border ${borderColor} rounded-lg bg-white ${shadow} ${shadowColor} hover:shadow-xl transition duration-300 p-3 max-w-md`}
    >
      <div className="flex items-center gap-3 w-full">
        <div className="w-16 h-16 flex-shrink-0 flex items-center justify-center rounded-md bg-gray-100">
          <MdReceiptLong className="text-gray-500 text-3xl" />
        </div>

        <div className="flex-grow space-y-1 text-sm relative">
          <h2 className="text-base font-semibold text-gray-800">
            Order #{order._id.slice(-6)}
          </h2>

          <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs text-gray-600">
            <div>
              <strong>Items:</strong> {itemCount}
            </div>
            <div>
              <strong>Total:</strong> ${order.totalPrice}
            </div>
            <div>
              <strong>Status:</strong> {order.status}
            </div>
            <div>
              <strong>Paid:</strong> {order.isPaid ? "Yes" : "No"}
            </div>
            <div className="col-span-2">
              <strong>Delivered:</strong> {order.isDelivered ? "Yes" : "No"}
            </div>
            <div className="col-span-2">
              <strong>Date:</strong> {orderDate}
            </div>
          </div>

          <div className="absolute bottom-0 right-0 flex gap-1 text-sm">
            <button
              className="bg-blue-100 text-blue-700 p-1.5 rounded-full hover:bg-blue-200 transition hover:cursor-pointer"
              onClick={handleShowProducts}
              title="Show products"
            >
              <FaEye />
            </button>

            {onRemove && (
              <button
                className="bg-red-100 text-red-700 p-1.5 rounded-full hover:bg-red-200 transition hover:cursor-pointer"
                onClick={() => onRemove(order)}
                title="Remove order"
              >
                <FaTrash />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
