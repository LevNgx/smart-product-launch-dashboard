import { Navigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";


function ProtectedRoute({children}){
    const {loggedInUser} = useAppContext();
    // commenting for now. will improvise later. validating token and getting logged in user 
    if(!loggedInUser){
        return <Navigate to="/" replace/>;
    }

    return children
}

export default ProtectedRoute;