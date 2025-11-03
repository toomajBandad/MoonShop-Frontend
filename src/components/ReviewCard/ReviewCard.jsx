import RenderStars from "../../utils/RenderStars";

export default function ReviewCard({ review }) {
  return (
    <div
      key={review._id}
      className="flex justify-start items-center border-1 border-gray-200 p-3 gap-3"
    >
      <div className="p-2">
        <img
          src={review.productId.images?.[0] || "/images/notFound.png"}
          alt={review.productId.name}
          className="w-40 object-cover"
        />
      </div>
      <div className="p-2">
        <div className="font-bold">{review.productId.name}</div>
        <div className="mb-3">{review.productId.desc}</div>

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
