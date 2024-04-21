import React, { Component } from 'react';

class SearchUserAccountsPage extends Component {
    state;

    constructor(props) {
        super(props);
        this.state = {
            accountType: '',
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    handleSubmit = (e) => {
        e.preventDefault();
        const { accountType } = this.state;
    }

    render() {
        const { accountType } = this.state;
        return (
            <div>
                <h2>Search for user accounts</h2>
                <form onSubmit={this.handleSubmit}>
                    <select
                        type="text"
                        name="accountType"
                        value={accountType}
                        onChange={this.handleChange}
                        placeholder="Account Type"
                    />
                    <br />
                    <button type="submit">Search</button>
                </form>
            </div>
        );
    }
}

export default SearchUserAccountsPage;
