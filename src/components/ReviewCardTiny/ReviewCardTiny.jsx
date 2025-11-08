import { FaTrash, FaEdit, FaEye, FaCheck, FaTimes } from "react-icons/fa";
import Swal from "sweetalert2";
import RenderStars from "../../utils/RenderStars";

export default function ReviewCardTiny({ review, onRemove, onToggleApproval }) {
  const handleShowComment = () => {
    Swal.fire({
      title: "Review Comment",
      html: `<p style="text-align:left;">${review.comment || "No comment"}</p>`,
      icon: "info",
      confirmButtonText: "Close",
    });
  };

  return (
    <div
      className={`flex items-center border rounded-lg bg-white shadow-sm hover:shadow-md transition duration-300 p-2 max-w-md ${
        review.isAccepted
          ? "border-green-400 shadow-green-200"
          : "border-gray-200"
      }`}
    >
      <div className="flex items-center gap-3 w-full">
        <div className="flex-grow space-y-1 text-sm relative">
          <h2 className="text-base font-semibold text-gray-800">
            {review.productId?.name || "Unnamed Product"}
          </h2>

          <div className="text-xs text-gray-600">
            <strong>User:</strong> {review.userId?.username || "Anonymous"}
          </div>

          <div className="flex items-center gap-2 mt-1">
            <span>Rate:</span>
            <RenderStars rating={review.rating} />
          </div>

          <div className="absolute bottom-0 right-0 flex gap-1 text-sm items-center">
            <button
              className="bg-indigo-100 text-indigo-700 p-1.5 rounded-full hover:bg-indigo-200 transition"
              onClick={handleShowComment}
            >
              <FaEye />
            </button>
            <button
              className={`p-1.5 rounded-full transition ${
                review.isAccepted
                  ? "bg-yellow-100 text-yellow-700 hover:bg-yellow-200"
                  : "bg-green-100 text-green-700 hover:bg-green-200"
              }`}
              onClick={() => onToggleApproval(review)}
              title={review.isAccepted ? "Reject Review" : "Accept Review"}
            >
              {review.isAccepted ? <FaTimes /> : <FaCheck />}
            </button>
            {onRemove && (
              <button
                className="bg-red-100 text-red-700 p-1.5 rounded-full hover:bg-red-200 transition"
                onClick={() => onRemove(review)}
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
