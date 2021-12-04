import React from "react";

const PrimaryButton = (props) => {
  return (
    <button
      onClick={props.onClick}
      className="text-white bg-blue-700 hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center cursor-pointer"
    >
      {props.text}
    </button>
  );
};

export default PrimaryButton;
