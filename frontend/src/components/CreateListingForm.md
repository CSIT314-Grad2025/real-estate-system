import { Component } from "react";
import { Navigate } from "react-router-dom";
import axios from "../api/axios";
import { withRouter } from "../withRouter";

class CreateListingForm extends Component {

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
    }

    componentDidMount = () => {
        // console.log({ state: this.state });
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    // @UserStory
    // As a Real Estate Agent, I want to create the listing of a property,
    // so that the users can see the listed properties
    handleSubmit = async (e) => {
        e.preventDefault();
        const { title, listingAgentID, sellerID, description, propertyType, livingArea, numberOfBedrooms, numberOfBathrooms, listPrice } = this.state;
        try {
            const response = await axios.post('/rea/create-listing',
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
    };

    render() {
        const { title, listingAgentID, sellerID, description, propertyType, livingArea, numberOfBedrooms, numberOfBathrooms, listPrice } = this.state;
        return (
            <div>
                <h2>Create Listing</h2>
                <form onSubmit={this.handleSubmit}>
                    <input
                        type="text"
                        name="email"
                        value={title}
                        onChange={this.handleChange}
                        placeholder="Title"
                    />
                    <br />
                    <input
                        type="text"
                        name="sellerID"
                        value={sellerID}
                        onChange={this.handleChange}
                        placeholder="Seller email"
                    />
                    <br />
                    <input
                        type="text"
                        name="description"
                        value={description}
                        onChange={this.handleChange}
                        placeholder="Description"
                    />
                    <br />
                    <input
                        type="text"
                        name="propertyType"
                        value={propertyType}
                        onChange={this.handleChange}
                        placeholder="PropertyType"
                    />
                    <br />
                    <input
                        type="text"
                        name="livingArea"
                        value={livingArea}
                        onChange={this.handleChange}
                        placeholder="Living Area"
                    />
                    <br />
                    <input
                        type="text"
                        name="bedrooms"
                        value={numberOfBedrooms}
                        onChange={this.handleChange}
                        placeholder="Number of Bedrooms"
                    />
                    <br />
                    <input
                        type="text"
                        name="bathrooms"
                        value={numberOfBathrooms}
                        onChange={this.handleChange}
                        placeholder="Number of Bathrooms"
                    />
                    <br />
                    <button type="submit">Create Property Listing</button>
                </form>
                <div>{this.state.errorMessage}</div>
            </div>
        );
    }
}

export default withRouter(CreateListingForm);
