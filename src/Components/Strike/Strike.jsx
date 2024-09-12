// import React from 'react'

// eslint-disable-next-line react/prop-types
const Strike = ({ strikeClass }) => {
  return (
    <div
      style={{
        transform:
          strikeClass === "strike-diagonal-1 active"
            ? "rotate(45deg) scale(1.2)"
            : strikeClass === "strike-diagonal-2 active"
            ? "rotate(-45deg) scale(1.2)"
            : "",

        transition:  strikeClass === "strike-diagonal-1 active"
        ? "all .5s"
        : strikeClass === "strike-diagonal-2 active"
        ? "all .5s"
        : "",
        top:  strikeClass === "strike-diagonal-1 active"
        ? "51%"
        : strikeClass === "strike-diagonal-2 active"
        ? "51%"
        : "",
        left: strikeClass === "strike-diagonal-1 active"
            ? "-1%"
            : strikeClass === "strike-diagonal-2 active"
            ? "0%"
            : "",
      }}
      className={`strike ${strikeClass}`}
    ></div>
  );
};

export default Strike;
