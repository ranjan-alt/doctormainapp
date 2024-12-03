import React from "react";

const RatingStats = ({ avgRating, totalReviews }) => {
  return (
    <div className="mt-4">
      {avgRating !== null ? (
        <div className="text-sm text-gray-600">
          <span className="font-semibold">Average Rating: </span>
          <span>
            {avgRating ? avgRating : "No rating yet"} ({totalReviews} reviews)
          </span>
        </div>
      ) : (
        <p>Loading review stats...</p> // Show loading message if data is not yet available
      )}
    </div>
  );
};

export default RatingStats;
