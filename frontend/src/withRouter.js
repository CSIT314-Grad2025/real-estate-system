import { useContext, } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import AuthContext from './context/AuthProvider';

export const withRouter = (Component) => {
    const Wrapper = (props) => {
        const navigate = useNavigate();
        const location = useLocation();
        const useAuth = () => {
            return useContext(AuthContext);
        }
        const auth = useAuth();
        console.log("Auth from router:", auth);
        return (
            <Component
                navigate={navigate}
                location={location}
                auth={auth}
                potato={"potato"}
                {...props}
            />
        );
    };

    return Wrapper;
};
