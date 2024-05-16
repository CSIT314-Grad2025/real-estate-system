import { AppBar, Button, Toolbar, Typography } from "@mui/material";
import { render } from "@testing-library/react";
import { Component } from "react";
import axios from "../api/axios";
import { withRouter } from "../withRouter";

class AppHeader extends Component {
    state;
    constructor(props) {
        super(props);
        this.state = {
            title: props.title || 'Real Estate Management System',
            auth: props.auth.auth,
            navigate: props.navigate,
        }
    }

    handleLogout = async (_e) => {
        try {
            await axios.put(`/${this.state.auth.accountType}/logout`, {}, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.state.auth.token}`
                },
                withCredentials: true
            });
        } catch (_err) {
        }
        window.sessionStorage.clear();
        this.state.navigate("/", { replace: true });
    }

    handleClickHome = async (_e) => {
        this.state.navigate("/", { replace: true });
    }

    render() {
        return (
            <AppBar position="static">
                <Toolbar>
                    <Button color="inherit" onClick={this.handleClickHome}>Home</Button>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        {this.state.title}
                    </Typography>
                    <Button color="inherit" onClick={this.handleLogout}>Logout</Button>
                </Toolbar>
            </AppBar>
        )
    }
}

export default withRouter(AppHeader)
