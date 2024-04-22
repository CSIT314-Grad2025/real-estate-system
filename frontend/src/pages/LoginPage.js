import { Component } from "react";
import { Navigate } from "react-router-dom";
import { withRouter } from "../withRouter";

class LoginPage extends Component {

    state;

    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: '',
        }
    }

    componentDidMount = () => {
        const user = localStorage.getItem("user");
        if (user) {
            const loadedUser = JSON.parse(user);
            if (loadedUser.type) {
                switch (loadedUser.type) {
                    case 'Seller':
                        {
                            return <Navigate to="/Seller" />
                        }
                    case 'Buyer': return <Navigate to="/Buyer" />
                    default: { }
                }
            }
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    handleSubmit = (e) => {
        e.preventDefault();
        const { username, password } = this.state;
        // Add authentication logic here
        // For simplicity, let's just check if both fields are non-empty
        if (username && password) {
            this.setState({ loggedIn: true });
        }

        console.log(this.state);
    };

    render() {
        const { username, password, loggedIn } = this.state;
        if (loggedIn) {
            // Redirect to Home
        }
        return (
            <div>
                <h2>Login</h2>
                <form onSubmit={this.handleSubmit}>
                    <input
                        type="text"
                        name="username"
                        value={username}
                        onChange={this.handleChange}
                        placeholder="Username"
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
            </div>
        );
    }
}

export default withRouter(LoginPage);
