import React, { useEffect } from "react";

const Chatbot = () => {
  useEffect(() => {
    // Inject the Dialogflow Messenger script
    const script = document.createElement("script");
    script.src =
      "https://www.gstatic.com/dialogflow-console/fast/messenger/bootstrap.js?v=1";
    script.async = true;

    // Append the script to the document body
    document.body.appendChild(script);

    // Clean up the script when the component unmounts
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div>
      <df-messenger
        intent="WELCOME"
        chat-title="emergency"
        agent-id="2eac428d-a7d8-4efa-9fa1-044fae09a316"
        language-code="en"
      ></df-messenger>
    </div>
  );
};

export default Chatbot;
