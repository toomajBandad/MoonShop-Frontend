import { FaTrash, FaEdit, FaEye } from "react-icons/fa";
import { MdReceiptLong } from "react-icons/md";
import Swal from "sweetalert2";

export default function CartCardTiny({ cart }) {
  const itemCount =
    cart.items?.reduce((sum, item) => sum + item.quantity, 0) || 0;
  const cartDate = new Date(cart.createdAt).toLocaleDateString();

  const totalPrice = cart.items.reduce((total, item) => {
    return total + item.product.price * item.quantity;
  }, 0);

  const handleShowProducts = () => {
    const productList = cart.items
      .map((item, index) => {
        const name = item.product?.name || `Product ${index + 1}`;
        return `<li><strong>${name}</strong> — ${item.quantity} × $${item.product.price}</li>`;
      })
      .join("");

    Swal.fire({
      title: `Products in Cart #${cart._id.slice(-6)}`,
      html: `<ul style="text-align:left; padding-left:1em;">${productList}</ul>`,
      confirmButtonText: "Close",
    });
  };

  return (
    <div
      className={`flex items-center bcart rounded-lg bg-white border border-gray-400 hover:shadow-xl transition duration-300 p-3 max-w-md`}
    >
      <div className="flex items-center gap-3 w-full">
        <div className="w-16 h-16 flex-shrink-0 flex items-center justify-center rounded-md bg-gray-100">
          <MdReceiptLong className="text-gray-500 text-3xl" />
        </div>

        <div className="flex-grow space-y-1 text-sm relative">
          <h2 className="text-base font-semibold text-gray-800">
            {cart.userId.username} Cart 
          </h2>

          <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs text-gray-600">
            <div>
              <strong>Items:</strong> {itemCount}
            </div>
            <div>
              <strong>Total:</strong> ${totalPrice}
            </div>
            <div className="col-span-2">
              <strong>Date:</strong> {cartDate}
            </div>
          </div>

          <div className="flex justify-end gap-1 text-sm">
            <button
              className="bg-blue-100 text-blue-700 p-1.5 rounded-full hover:bg-blue-200 transition hover:cursor-pointer"
              onClick={handleShowProducts}
              title="Show products"
            >
              <FaEye />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
