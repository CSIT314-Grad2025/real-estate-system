import React, { Component } from 'react';

class UpdateUserAccounPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            accountType: '',
            password: '',
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    handleSubmit = (e) => {
        e.preventDefault();
        const { _firstName, _lastName } = this.state;
    }

    render() {
        const {firstName, lastName, email, password, accountType} = this.state;
        return (
            <div>
                <h2>Update a user account</h2>
                <form onSubmit={this.handleSubmit}>
                    <input
                        type="text"
                        name="firstName"
                        value={firstName}
                        onChange={this.handleChange}
                        placeholder="First Name"
                    />
                    <br />
                    <input
                        type="text"
                        name="lastName"
                        value={firstName}
                        onChange={this.handleChange}
                        placeholder="Last Name"
                    />
                    <br />
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
                    <select
                        type=""
                        name="accountType"
                        value={firstName}
                        onChange={this.handleChange}
                        placeholder="Account Type"
                    />
                    <br />
                    <button type="submit">Update User</button>
                </form>
            </div>
        );
    }
}

export default UpdateUserAccounPage;
