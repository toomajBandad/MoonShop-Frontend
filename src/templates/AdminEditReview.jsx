import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import ReviewCardTiny from "../components/ReviewCardTiny/ReviewCardTiny";

export default function AdminEditReview() {
  const appUrl = import.meta.env.VITE_BACKEND_URL;

  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  const refreshReviews = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${appUrl}/review/all`);
      setReviews(response.data);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    } finally {
      setLoading(false);
    }
  };

  function deleteReview(review) {
    Swal.fire({
      title: "Are you sure?",
      text: `Do you really want to delete "${review.name}"?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`${appUrl}/review/${review._id}`);
          Swal.fire("Deleted!", "Review has been deleted.", "success");
          refreshReviews();
        } catch (error) {
          console.error("Delete failed:", error);
          Swal.fire("Error", "Failed to delete review.", "error");
        }
      }
    });
  }
  function onToggleApproval(review) {
    const action = review.isAccepted ? "reject" : "accept";
    const confirmText = review.isAccepted
      ? "Yes, reject it!"
      : "Yes, accept it!";
    const successText = review.isAccepted
      ? "Review has been rejected."
      : "Review has been accepted.";

    Swal.fire({
      title: "Are you sure?",
      text: `Do you really want to ${action} this review"?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: confirmText,
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.patch(`${appUrl}/review/update/${review._id}`);
          Swal.fire("Updated!", successText, "success");
          refreshReviews(); // Re-fetch or re-render the list
        } catch (error) {
          console.error("Approval update failed:", error);
          Swal.fire("Error", "Failed to update review status.", "error");
        }
      }
    });
  }

  useEffect(() => {
    refreshReviews();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="p-5 md:p-10">
      {loading ? (
        <p className="text-gray-600">Loading reviews...</p>
      ) : (
        <div>
          {reviews.length === 0 ? (
            <p className="text-gray-500">No reviews available.</p>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-2">
              {reviews.map((review) => (
                <ReviewCardTiny
                  key={review._id}
                  review={review}
                  onToggleApproval={onToggleApproval}
                  onRemove={deleteReview}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
