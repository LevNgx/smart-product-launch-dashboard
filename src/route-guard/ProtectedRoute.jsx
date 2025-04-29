import { Navigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";


function ProtectedRoute({children}){
    const {loggedInUser} = useAppContext();
    if(!loggedInUser){
        return <Navigate to="/" replace/>;
    }

    return children
}

export default ProtectedRoute;