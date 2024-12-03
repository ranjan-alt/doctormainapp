import React, { useEffect, useState } from "react";
import { useReview } from "../context/ReviewContext";
import { toast } from "react-toastify";
import RatingStats from "../components/RatingStats";

const ReviewPage = ({ docId, backendUrl }) => {
  const { fetchReviews, fetchReviewStats } = useReview();
  const [reviews, setReviews] = useState([]);
  const [reviewStats, setReviewStats] = useState(null);
  console.log(reviewStats, "main"); //this is undefined

  // Fetch reviews and stats
  useEffect(() => {
    if (docId) {
      const getReviews = async () => {
        try {
          const fetchedReviews = await fetchReviews(docId, backendUrl, toast);
          setReviews(fetchedReviews);
          const fetchedStats = await fetchReviewStats(docId, backendUrl, toast);
          setReviewStats(fetchedStats);
        } catch (error) {
          console.error("Error fetching reviews", error);
        }
      };

      getReviews();
    }
  }, [docId, backendUrl]);

  // Extract avgRating and totalReviews from reviewStats, handle null/undefined
  const avgRating = reviewStats ? reviewStats.avgRating : null;
  const totalReviews = reviewStats ? reviewStats.totalReviews : 0;

  return (
    <div className="mt-8">
      <h3 className="text-xl font-medium text-gray-800">Reviews</h3>
      <RatingStats avgRating={avgRating} totalReviews={totalReviews} />

      {/* Display review stats if available */}

      {/* Display reviews */}
      {reviews.length > 0 ? (
        <div className="mt-4 max-h-[400px] overflow-y-auto">
          {reviews.map((review, index) => (
            <div key={index} className="border-b border-gray-300 py-4">
              <div className="flex items-center gap-2">
                {/* Display rating */}
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span
                      key={star}
                      className={`text-xl ${
                        review.rating >= star
                          ? "text-yellow-500"
                          : "text-gray-300"
                      }`}
                    >
                      ★
                    </span>
                  ))}
                </div>
                <span className="text-sm text-gray-500">
                  {new Date(review.createdAt).toLocaleDateString()}
                </span>
              </div>

              {/* Display review text */}
              <p className="text-gray-700 mt-2">{review.review}</p>

              <div className="flex items-center gap-3 mt-4">
                {/* Optionally, add avatar */}
                <img
                  src={review.userId.image || "/default-avatar.png"} // Add a default avatar if no image
                  alt="User Avatar"
                  className="w-8 h-8 rounded-full object-cover"
                />
                <p className="font-semibold text-gray-800 text-lg">
                  {review.userId.name}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No reviews yet. Be the first to review!</p>
      )}
    </div>
  );
};

export default ReviewPage;
