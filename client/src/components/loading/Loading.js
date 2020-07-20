import React from "react";
import { AiOutlineSync } from "react-icons/ai";

const Loading = () => {
  const style = {
    fontSize: "4rem",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  return (
    <div style={style}>
      <AiOutlineSync />
    </div>
  );
};

export default Loading;
