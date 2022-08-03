import React, { useEffect } from "react";

import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../authentication/firebase";

const ProtectedAuthComponent = ({ children }) => {
  const navigate = useNavigate();
  const [user, isLoading] = useAuthState(auth);

  useEffect(() => {
    if (user) {
      navigate("/");
      return;
    }
  }, [user, navigate]);

  if (isLoading) {
    return;
  } else {
    return children;
  }
};

export default ProtectedAuthComponent;
