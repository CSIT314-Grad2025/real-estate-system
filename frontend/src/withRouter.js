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
        return (
            <Component
                navigate={navigate}
                location={location}
                auth={auth}
                {...props}
            />
        );
    };

    return Wrapper;
};
