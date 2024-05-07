import { Component } from "react";
import { Navigate } from "react-router-dom";
import axios from "../api/axios";
import { withRouter } from "../withRouter";

class LoginPage extends Component {

    state;

    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            errorMessage: '',
            setAuth: props.auth.setAuth,
            navigate: props.navigate,
            location: props.location,
            from: props.location.state?.from?.pathname || "/"
        }
        console.log("login.props : ", props)
        console.log("login.state.from : ", this.state.from)
    }

    componentDidMount = () => {
        // console.log({ state: this.state });
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    handleSubmit = async (e) => {
        e.preventDefault();
        const { email, password } = this.state;
        try {
            const response = await axios.post('/systemadmin/login',
                JSON.stringify({ email, password }), {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            }
            );
            console.log("API Response: ", response?.data);
            this.state.setAuth({
                firstName: response?.data?.firstName,
                accountType: response?.data?.accountType,
                token: response?.data?.token,
            })
            this.state.navigate(this.state.from, { replace: true });
        } catch (err) {
            console.log("ERROR: ", err?.response);
            if (err?.response) {
                this.setState({
                    errorMessage: err.response.data.message
                });
            } else {
                this.setState({
                    errorMessage: "No response from server"
                });
            }
        }
    };

    render() {
        const { email, password, loggedIn } = this.state;
        if (loggedIn) {
            // Redirect to Home
        }
        return (
            <div>
                <h2>Login</h2>
                <form onSubmit={this.handleSubmit}>
                    <input
                        type="text"
                        name="email"
                        value={email}
                        onChange={this.handleChange}
                        placeholder="Email"
                    />
                    <br />
                    <input
                        type="password"
                        name="password"
                        value={password}
                        onChange={this.handleChange}
                        placeholder="Password"
                    />
                    <br />
                    <button type="submit">Login</button>
                </form>
                <div>{this.state.errorMessage}</div>
            </div>
        );
    }
}

export default withRouter(LoginPage);
