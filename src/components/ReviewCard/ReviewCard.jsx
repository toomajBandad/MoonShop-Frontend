import RenderStars from "../../utils/RenderStars";

export default function ReviewCard({ review }) {
  return (
    <div className="border border-gray-200 rounded-md p-3 md:p-2 text-sm w-full max-w-md mx-auto grid grid-cols-1 sm:grid-cols-3 gap-2">
      {/* Product Info */}
      <div className="flex flex-col items-center justify-center text-center space-y-2">
        <img
          src={review.productId.images?.[0] || "/images/notFound.png"}
          alt={review.productId.name}
          className="w-28 h-28 object-cover rounded"
        />

      </div>

      {/* Review Content */}
      <div className="space-y-2 col-span-2">
                <div className="font-semibold text-gray-800">
          {review.productId?.name}
        </div>
        <div className="flex items-center gap-0 text-gray-800 font-medium">
          <span>Rate:</span>
          <div className="flex items-center gap-1 text-yellow-400">
            <RenderStars rating={review.rating} />
            <span className="ml-1 text-gray-600">({review.rating}/5)</span>
          </div>
        </div>

        <div className="flex flex-col text-gray-800 font-medium">
          <div>Comment:</div>
          <div className="text-gray-600 font-normal">{review.comment}</div>
        </div>
      </div>
    </div>
  );
}
