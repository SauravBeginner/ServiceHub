import { Navigate, Outlet } from "react-router-dom";
import { useFirebase } from "../context/Firebase";

const PublicRoute = () => {
  const { currentUser } = useFirebase();

  return !currentUser ? <Outlet /> : <Navigate to="/" />;
};

export default PublicRoute;
