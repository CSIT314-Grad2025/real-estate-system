import React, { Component } from 'react';

class SystemAdminHomePage extends Component {
    state;

    constructor(props) {
        super(props);
        this.state = {
            loginToken: props.loginToken
        }
    }

    handleLogout = (_e) => {
        this.loginToken = null
    }

    render() {
        return (
            <div>
                <h2>Welcome</h2>
            </div>
        );
    }
}

export default SystemAdminHomePage;
