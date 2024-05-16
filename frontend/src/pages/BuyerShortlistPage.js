import { Component } from 'react';

class ShortlistedProperties extends Component {
    render() {
        const { properties } = this.props;
        return (
            <div>
                <h2>Shortlisted Properties</h2>
                <ul>
                    {properties.map((property, index) => (
                        <li key={index}>
                            <h3>{property.name}</h3>
                            <p>Price: ${property.price}</p>
                            <p>Location: {property.location}</p>
                            <p>Bedrooms: {property.bedrooms}</p>
                            <p>Bathrooms: {property.bathrooms}</p>
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
}

export default ShortlistedProperties;
