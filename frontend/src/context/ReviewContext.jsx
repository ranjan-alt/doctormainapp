import axios from "axios";
import { createContext, useContext, useState } from "react";

const ReviewContext = createContext();

export const ReviewProvider = ({ children }) => {
  const [isReviewModalOpen, setIsReviewModalOpen] = useState();
  const [review, setReview] = useState("");
  const [selectedAppointment, setSelectedAppointment] = useState(null);

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
      toast.error("Error fetching reviews");
      console.error(error);
      return []; // Return an empty array or handle error properly
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
      }}
    >
      {" "}
      {children}
    </ReviewContext.Provider>
  );
};

export const useReview = () => useContext(ReviewContext);
