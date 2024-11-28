// ReviewPage.js
import React, { useEffect, useState } from "react";
import { useReview } from "../context/ReviewContext";
import { toast } from "react-toastify";

const ReviewPage = ({ docId, backendUrl }) => {
  const { fetchReviews } = useReview();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    if (docId) {
      const getReviews = async () => {
        try {
          const reviews = await fetchReviews(docId, backendUrl, toast);
          setReviews(reviews);
        } catch (error) {
          console.error("Error fetching reviews", error);
        }
      };

      getReviews();
    }
  }, [docId, backendUrl]);

  return (
    <div className="mt-8">
      <h3 className="text-xl font-medium text-gray-800">Reviews</h3>
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
