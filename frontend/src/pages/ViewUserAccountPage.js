import { Component } from "react";

class ViewUserAccountPage extends Component {

    state;

    constructor(props) {
        super(props)
        this.state = {
            email: '',
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    handleSubmit = (e) => {
        e.preventDefault();
        const { email } = this.state;
    };

    render() {
        return (
            <div>
                <h2>View User Account</h2>
                <form onSubmit={this.handleSubmit}>
                </form>
            </div>
        );
    }
}

export default ViewUserAccountPage;
