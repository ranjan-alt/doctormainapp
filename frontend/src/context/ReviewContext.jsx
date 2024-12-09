import axios from "axios";
import { createContext, useContext, useState } from "react";

const ReviewContext = createContext();

export const ReviewProvider = ({ children }) => {
  const [isReviewModalOpen, setIsReviewModalOpen] = useState();
  const [review, setReview] = useState("");
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [reviewStats, setReviewStats] = useState(null);
  console.log(reviewStats, "context");
  const openReviewModal = (appointment) => {
    setSelectedAppointment(appointment);
    setIsReviewModalOpen(true);
  };

  const closeReviewModal = () => {
    setIsReviewModalOpen(false);
    setReview("");
  };

  const submitReview = async (
    docId,
    reviewText,
    token,
    backendUrl,
    getUserAppointments,
    toast,
    userId,
    rating
  ) => {
    if (!reviewText.trim()) {
      toast.error("Please write a review before submitting!");
      return;
    }

    try {
      const { data } = await axios.post(
        backendUrl + "/api/reviews/add",
        { docId, review: reviewText, userId, rating },
        { headers: { token } }
      );
      if (data.success) {
        toast.success("Review submitted successfully!");
        getUserAppointments(); // Refresh the appointments list
        closeReviewModal();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to submit the review. Please try again.");
    }
  };

  const fetchReviews = async (docId, backendUrl, toast) => {
    console.log(docId, "ftechhh");
    try {
      const response = await axios.get(
        `${backendUrl}/api/reviews/doctor/${docId}`
      );
      return response.data; // Ensure you return the fetched data here
    } catch (error) {
      // toast.error("Error fetching reviews");
      console.error(error);
      return []; // Return an empty array or handle error properly
    }
  };

  const fetchReviewStats = async (docId, backendUrl, toast) => {
    try {
      const response = await axios.get(
        `${backendUrl}/api/reviews/reviewstats/${docId}`
      );
      const stats = response.data; // Store the fetched stats
      setReviewStats(stats); // Set state with the stats
      return stats; // Ensure the data is returned for use in the component
    } catch (error) {
      // toast.error("Error fetching review stats");
      console.error(error);
      return null; // Return null if there's an error
    }
  };

  return (
    <ReviewContext.Provider
      value={{
        isReviewModalOpen,
        selectedAppointment,
        review,
        setReview,
        openReviewModal,
        closeReviewModal,
        submitReview,
        fetchReviews,
        fetchReviewStats,
      }}
    >
      {" "}
      {children}
    </ReviewContext.Provider>
  );
};

export const useReview = () => useContext(ReviewContext);
