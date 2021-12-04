import React from "react";

const DateCheckBox = (props) => {
  return (
    <div className={props.className}>
      <input
        type="checkbox"
        className={
          "mr-0 md:mr-2 form-tick h-4 w-4 border border-gray-400 rounded-md checked:bg-blue-600 checked:border-transparent focus:outline-none"
        }
        id={props.id}
        onChange={props.onChange}
        checked={props.checked}
      />
      <span className="text-gray-900 text-sm">{props.time}</span>
    </div>
  );
};

export default DateCheckBox;
