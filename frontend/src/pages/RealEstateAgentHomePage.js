import React, { Component } from 'react';

class RealEstateAgentHomePage extends Component {
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

    // @UserStory
    // As a Real Estate Agent, I want to search other property listings
    // to keep track of the market.
    handleSearch = async(_e) => {
        _e.preventDefault();
    }

    render() {
        return (
            <div>
                <h2>Welcome {this.state.firstName}</h2>
            </div>
        );
    }
}

export default RealEstateAgentHomePage;
