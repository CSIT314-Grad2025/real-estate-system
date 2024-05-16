import { Box, CircularProgress } from "@mui/material";
import { useContext } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import AuthContext from "../context/AuthProvider.js";

const RequireAuth = ({ allowedRoles }) => {
    const { auth, loading } = useContext(AuthContext);
    const location = useLocation();

    if (loading) {
        return <Box sx={{ width: '50%', mt: 50, mx: 'auto' }}> <CircularProgress /> </Box>
    }

    return (
        allowedRoles?.includes(auth?.accountType)
            ? <Outlet />
            : <Navigate to="/" state={{ from: location }} replace />
    );
};

export default RequireAuth;
