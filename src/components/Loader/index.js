import React from "react";
import logo2 from "../../assets/img/logo2.svg";

const Loader = () => {
  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        backgroundColor: "#1D212C",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
      }}
    >
      <img src={logo2} style={{ margin: "1em" }} alt="logo" />
    </div>
  );
};

export default Loader;
