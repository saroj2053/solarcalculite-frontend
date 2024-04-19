import React from "react";
import { Navigate } from "react-router-dom";
import useAuthUserStore from "../../store/userStore";

function Protected({ children }) {
  const { authUser, setAUthUser } = useAuthUserStore();

  if (!authUser?.token) {
    return <Navigate to="/" />;
  } else {
    return children;
  }
}

export default Protected;
