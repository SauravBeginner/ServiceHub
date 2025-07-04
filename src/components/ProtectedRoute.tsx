import { Navigate, Outlet } from "react-router-dom";
import { useFirebase } from "../context/Firebase";

const ProtectedRoute = () => {
  const { currentUser } = useFirebase();

  return currentUser ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
