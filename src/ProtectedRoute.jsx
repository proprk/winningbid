import { Navigate } from "react-router"

const ProtectedRoute = ({children}) => {
    const token = localStorage.getItem("app_token")

    if (!token) {
        <Navigate to="/" replace/>
    }

    return children
}

export default ProtectedRoute