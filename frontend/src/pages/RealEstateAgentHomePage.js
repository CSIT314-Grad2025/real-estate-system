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
    handleSearch = (_e) => {
        e.preventDefault();
        const { title, listingAgentID, sellerID, description, propertyType, livingArea, numberOfBedrooms, numberOfBathrooms, listPrice } = this.state;
        try {
            const response = await axios.post('/rea/search',
                JSON.stringify({
                    title,
                    listingAgentID,
                    sellerID,
                    description,
                    propertyType,
                    livingArea,
                    numberOfBedrooms,
                    numberOfBathrooms,
                    listPrice
                }), {
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
