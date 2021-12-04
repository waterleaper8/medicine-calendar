import React from "react";

const SecondaryButton = (props) => {
  return (
    <div className={props.className}>
      <button
        onClick={props.onClick}
        className={`text-white bg-gray-500 hover:bg-gray-400 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center cursor-pointer`}
      >
        {props.text}
      </button>
    </div>
  );
};

export default SecondaryButton;
