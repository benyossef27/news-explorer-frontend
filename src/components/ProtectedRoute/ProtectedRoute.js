import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";

export default function ProtectedRoute({ children, isLoggedIn, openForm }) {
  const navigate = useNavigate();

  const navigateToForm = useCallback(() => {
    navigate("/");
    openForm();
  }, [navigate, openForm]);

  React.useEffect(() => {
    !isLoggedIn && navigateToForm();
  }, [isLoggedIn, navigateToForm]);
  return <>{isLoggedIn && children}</>;
}
