import React from "react";

const DynamicBg = () => {
  return (
    <div>
      <svg
        className="background--custom"
        id="demo"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <path
          fill="#5482fd"
          fillOpacity="1"
          d="M-100 -100L200 -100L200 20L-100 20Z"
          id="path0"
        />
        <path
          fill="#3f7110"
          fillOpacity="0.6"
          d="M-100 -100L200 -100L200 20L-100 20Z"
          id="path1"
        />
        <path
          fill="#e3bbd4"
          fillOpacity="0.2"
          d="M-100 -100L200 -100L200 20L-100 20Z"
          id="path2"
        />
      </svg>
      <style jsx="true">{`
        path {
          transform-origin: 50% 0%;
        }
        #path0 {
          animation: path0 12.820512820512821s linear infinite alternate;
        }
        #path1 {
          animation: path1 3.2258064516129035s linear infinite alternate;
        }
        #path2 {
          animation: path2 31.25s linear infinite alternate;
        }
        .background--custom {
          background-color: #ffffff;
          position: absolute;
          width: 100vw;
          height: 100vh;
          z-index: -1;
          top: 0;
          left: 0;
        }
        @keyframes path0 {
          0% {
            transform: rotate(30deg);
          }
          100% {
            transform: rotate(-30deg);
          }
        }
        @keyframes path1 {
          0% {
            transform: rotate(-30deg);
          }
          100% {
            transform: rotate(30deg);
          }
        }
        @keyframes path2 {
          0% {
            transform: rotate(10deg);
          }
          100% {
            transform: rotate(-10deg);
          }
        }
      `}</style>
    </div>
  );
};

export default DynamicBg;
