import { Component } from "react";
import { Navigate, Outlet } from "react-router-dom";

class RequireAuth extends Component {
    state;
    constructor(props) {
        super(props);
        this.state = {
            auth: props.auth,
            location: props.location
        }
    }

    render() {
        return (
            this.auth?.user
                ? <Outlet />
                : <Navigate to="login" state={{ from: this.location }} replace />
        )
    }
}

export default RequireAuth;
