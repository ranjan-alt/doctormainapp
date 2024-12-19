import React, { useState } from "react";

const TranslateButton = () => {
  const [isChrome, setIsChrome] = useState(false);

  // Check if the user is using Google Chrome
  const checkIfChrome = () => {
    const userAgent = navigator.userAgent;
    if (userAgent.indexOf("Chrome") !== -1 && !userAgent.includes("Edge")) {
      setIsChrome(true);
    } else {
      setIsChrome(false);
    }
  };

  // Function to redirect to Google Translate
  const triggerTranslation = () => {
    if (isChrome) {
      // Get the current page URL
      const currentUrl = window.location.href;
      // Redirect to Google Translate with the current page URL
      window.open(
        `https://translate.google.com/translate?hl=en&sl=auto&tl=en&u=${encodeURIComponent(
          currentUrl
        )}`,
        "_blank"
      );
    } else {
      alert(
        "You are not using Google Chrome. Please use Google Chrome to enable the translation feature."
      );
    }
  };

  // Call checkIfChrome when the component mounts
  React.useEffect(() => {
    checkIfChrome();
  }, []);

  return (
    <div>
      {/* Button to trigger translation */}
      <button onClick={triggerTranslation}>Translate Page</button>
    </div>
  );
};

export default TranslateButton;
