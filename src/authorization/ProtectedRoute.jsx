import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";

// import CurrentUserContext from "../../../contexts/CurrentUserContext";
import CurrentUserContext from "../contexts/CurrentUserContext";

const ProtectedRoute = () => {
  const { isLoggedIn } = useContext(CurrentUserContext);

  if (!isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
