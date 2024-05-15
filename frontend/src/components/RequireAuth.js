import { Component } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { withRouter } from "../withRouter";

class RequireAuth extends Component {
    state;
    constructor(props) {
        super(props);
        this.state = {
            auth: props.auth.auth,
            location: props.location,
            allowedRoles: props.allowedRoles,
        }
    }

    render() {
        console.log("FROM REQUIRE AUTH: ", this.state)
        return (
            this.state.allowedRoles?.includes(this.state.auth?.accountType)
                ? <Outlet />
                : <Navigate to="/" state={{ from: this.state.location }} replace />
        )
    }
}

export default withRouter(RequireAuth);
