import React, { Component } from 'react';

class PropertyListingCard extends Component {
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

    // Note: This boundary component is reusable for multiple stories
    // @UserStory
    // As a Real Estate Agent, I want to view the properties that I have listed
    // to keep track of my record.
    // 
    // @UserStory
    // As A Seller I want to be able to view all of my listed properties, so that I can
    // know their status at a glance
    handleViewProperty = async (_e) => {
        _e.preventDefault();
        this.state.navigate(`/property-listings/${this.state.title}`)
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

export default PropertyListingCard;
