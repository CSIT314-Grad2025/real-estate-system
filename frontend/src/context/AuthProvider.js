import { createContext, useEffect, useState } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (window.sessionStorage.getItem("accountType") && window.sessionStorage.getItem("token")) {
            setAuth({
                accountType: window.sessionStorage.getItem("accountType"),
                token: window.sessionStorage.getItem("token"),
            })
        }
        setLoading(false);

    }, [])

    return (
        <AuthContext.Provider value={{ auth, setAuth, loading }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;
