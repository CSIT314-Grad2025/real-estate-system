import { useContext, } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import AuthContext from './context/AuthProvider';

export const withRouter = (Component) => {
    const Wrapper = (props) => {
        const navigate = useNavigate();
        const location = useLocation();
        const params = useParams();
        const useAuth = () => {
            return useContext(AuthContext);
        }
        const auth = useAuth();
        return (
            <Component
                navigate={navigate}
                location={location}
                auth={auth}
                params={params}
                {...props}
            />
        );
    };

    return Wrapper;
};
