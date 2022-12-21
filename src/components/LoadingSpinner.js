import React from "react";

const STYLES = {
  fill: "purple",
};
const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="40"
        height="40"
        viewBox="0 0 24 24"
        style={STYLES}
        className="animate-spin"
      >
        <circle cx="12" cy="20" r="2"></circle>
        <circle cx="12" cy="4" r="2"></circle>
        <circle cx="6.343" cy="17.657" r="2"></circle>
        <circle cx="17.657" cy="6.343" r="2"></circle>
        <circle cx="4" cy="12" r="2.001"></circle>
        <circle cx="20" cy="12" r="2"></circle>
        <circle cx="6.343" cy="6.344" r="2"></circle>
        <circle cx="17.657" cy="17.658" r="2"></circle>
      </svg>
    </div>
  );
};

export default LoadingSpinner;
