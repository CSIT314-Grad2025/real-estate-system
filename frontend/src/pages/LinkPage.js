import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class LinkPage extends Component {
    render() {
        return (
            <section>
                <h1>Links</h1>
                <br />
                <h2>Public</h2>
                <Link to="/login">Login</Link>
                <Link to="/register">Register</Link>
                <br />
                <h2>Private</h2>
                <Link to="/">Home</Link>
                <Link to="/buyer">Buyer Page</Link>
                <Link to="/seller">Seller Page</Link>
                <Link to="/agent">Real Estate Agent Page</Link>
                <Link to="/systemadmin">System Admin Page</Link>
            </section>
        );
    }
}

export default LinkPage;
