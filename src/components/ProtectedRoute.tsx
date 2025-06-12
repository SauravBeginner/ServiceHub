import { Navigate } from "react-router-dom";
import { useFirebase } from "../context/Firebase"

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const { currentUser } = useFirebase();

    if (!currentUser) {
        <Navigate to='/login' replace />
    }

    return children;
}

export default ProtectedRoute;