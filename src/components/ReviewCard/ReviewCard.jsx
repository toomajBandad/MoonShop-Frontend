import RenderStars from "../../utils/RenderStars";

export default function ReviewCard({ review }) {
  return (
    <div className="border border-gray-200 grid grid-cols-2">
      <div className="py-3 flex flex-col items-center justify-center">
        <div className="font-bold">{review.productId.name}</div>
        <img
          src={review.productId.images?.[0] || "/images/notFound.png"}
          alt={review.productId.name}
          className="w-40 h-40 object-cover"
        />
      </div>
      <div className="space-y-2 py-3 px-1 max-w-md">
        <div className="text-gray-500 text-sm line-clamp-3">{review.productId.desc}</div>

        <span className="text-gray-800 font-bold flex gap-2 items-center ">
          Rate:
          <div className="flex items-center gap-1 text-yellow-400">
            <div className="flex items-center gap-1">
              <RenderStars rating={review.rating} />
              <span className="ml-2 text-sm text-gray-600">
                ({review.rating}/5)
              </span>
            </div>
          </div>
        </span>

        <div className="text-gray-800 font-bold flex gap-2">
          Comment:
          <span className="text-gray-600 font-medium">{review.comment}</span>
        </div>
      </div>
    </div>
  );
}
