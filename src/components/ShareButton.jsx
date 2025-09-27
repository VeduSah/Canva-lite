import React from "react";

const ShareButton = ({ link }) => {
  const handleClick = () => {
    navigator.clipboard.writeText(link);
    alert("Link copied: " + link);
  };

  return <button onClick={handleClick}>🔗 Share Canvas</button>;
};

export default ShareButton;
