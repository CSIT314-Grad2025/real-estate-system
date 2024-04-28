import React, { Component } from 'react';
import { withRouter } from '../withRouter';

class SellerHomePage extends Component {
    state;

    constructor(props) {
        super(props);
        this.state = {
            user: this.props
        }
    }

    handleLogout = (_e) => {
        this.loginToken = null
    }

    render() {
        return (
            <div>
                <h2>Welcome Seller</h2>
            </div>
        );
    }
}

export default withRouter(SellerHomePage);
