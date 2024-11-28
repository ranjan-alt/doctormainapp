const StarRating = ({ rating, setRating }) => {
  const handleMouseEnter = (index) => {
    setRating(index + 1); // Update the rating as the user hovers over stars
  };

  const handleClick = (index) => {
    setRating(index + 1); // Set the rating when a user clicks on a star
  };

  return (
    <div className="flex items-center">
      {[...Array(5)].map((_, index) => (
        <svg
          key={index}
          xmlns="http://www.w3.org/2000/svg"
          className={`h-6 w-6 cursor-pointer ${
            index < rating ? "text-yellow-500" : "text-gray-300"
          }`}
          fill="currentColor"
          viewBox="0 0 20 20"
          onMouseEnter={() => handleMouseEnter(index)}
          onClick={() => handleClick(index)}
        >
          <path
            fillRule="evenodd"
            d="M10 15l3.09 1.635-1.177-3.837L15 8.37l-3.904-.002L10 4 8.904 8.368 5 8.37l3.088 4.428-1.177 3.837L10 15z"
            clipRule="evenodd"
          />
        </svg>
      ))}
    </div>
  );
};
export default StarRating;
