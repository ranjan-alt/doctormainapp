// ReviewStats.js
import React, { useEffect } from "react";
// import { useReview } from "./ReviewContext"; // Import the custom hook
import { useReview } from "../context/ReviewContext";

const ReviewStats = ({ docId, backendUrl }) => {
  const { reviewStats, fetchReviewStats, toast } = useReview();

  useEffect(() => {
    if (docId) {
      fetchReviewStats(docId, backendUrl, toast); // Fetch review stats when docId changes
    }
  }, [docId, backendUrl, fetchReviewStats, toast]);

  return (
    <div className="review-stats">
      <p>Doctor's Rating: {reviewStats.avgRating}</p>
      <p>Total Reviews: {reviewStats.totalReviews}</p>
    </div>
  );
};

export default ReviewStats;
