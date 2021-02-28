import React from "react";
import { Redirect, Route, useHistory } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { currentUser } = useAuth();
  var isAuthenticated = false;
  if (currentUser) {
    isAuthenticated = currentUser.isAuthenticated;
  }
  return (
    <Route
      {...rest}
      render={(props) =>
        !currentUser && !isAuthenticated ? (
          <Redirect to="/" />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

export default PrivateRoute;
