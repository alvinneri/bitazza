import React from "react";
import { Route, Redirect } from "react-router-dom";
import Navbar from "../Navbar";

export const PrivateRoute = ({ component, ...rest }) => {
  const user = localStorage.getItem("User");

  return user ? (
    <>
      <Route {...rest} component={component} />
      <Navbar />
    </>
  ) : (
    <Redirect to="/login" />
  );
};
