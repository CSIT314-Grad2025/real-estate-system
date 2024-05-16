import { Box, CircularProgress } from "@mui/material";
import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import AuthContext from "../context/AuthProvider.js";

const RequireAuth = ({ allowedRoles }) => {
    const { auth, loading } = useContext(AuthContext);

    if (loading) {
        return <Box sx={{ width: '50%', mt: 50, mx: 'auto' }}> <CircularProgress /> </Box>
    }

    return (
        allowedRoles?.includes(auth?.accountType)
            ? <Outlet />
            : <Navigate to="/" replace />
    );
};

export default RequireAuth;
