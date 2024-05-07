import React, { Component } from 'react';

class PropertyListingComponent extends Component {
    state;

    constructor(props) {
        super(props);
        this.state = {
            loginToken: props.loginToke,
            title: "",
            listingAgentID: "",
            sellerID: "",
            description: "",
            propertyType: "",
            livingArea: "",
            numberOfBedrooms: "",
            numberOfBathrooms: "",
            listPrice: "",
        }
    }

    // @UserStory
    // As a Real Estate Agent, I want to update the information of the properties I have listed
    // so that the information is up to date.
    handleUpdate = async (_e) => {
        _e.preventDefault();
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
    }

    // @UserStory
    // As a Real Estate Agent, I want to be able to delete a property listing
    // so that I can remove properties that are no longer for sale.
    handleDelete = async (_e) => {
        _e.preventDefault();
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
    }

    render() {
        return (
            <div>
                <h2>Property Listing Title</h2>
                <div class="min-h-screen flex items-center justify-center px-4">

                    <div class="max-w-4xl  bg-white w-full rounded-lg shadow-xl">
                        <div class="p-4 border-b">
                            <h2 class="text-2xl ">
                                Property Description
                            </h2>
                            <p class="text-sm text-gray-500">

                            </p>
                        </div>
                        <div>
                            <div class="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b">
                                <p class="text-gray-600">
                                    Living Area
                                </p>
                            </div>
                            <div class="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b">
                                <p class="text-gray-600">
                                    Property Type
                                </p>
                            </div>
                            <div class="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b">
                                <p class="text-gray-600">
                                    Number of bedrooms
                                </p>
                                <p>
                                    Number of Bathrooms
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default PropertyListingComponent;
