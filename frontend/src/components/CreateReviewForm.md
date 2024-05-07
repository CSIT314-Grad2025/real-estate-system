import { Component } from "react";
import { Navigate } from "react-router-dom";
import axios from "../api/axios";
import { withRouter } from "../withRouter";

class CreateReviewForm extends Component {

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
    // As a seller I want to be able to review my property agents,
    // so that I can let other people know my experience with the property agents. 
    handleSubmit = async (e) => {
        e.preventDefault();
        const { reviewTitle, reviewBody, reviewerID, rating, agentID, } = this.state;
        try {
            const response = await axios.post('/rea/create-listing',
                JSON.stringify({
                    reviewTitle: "",
                    reviewBody: "",
                    reviewerID: "",
                    rating: "",
                    agentID: "",
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
        const { reviewTitle, reviewBody, reviewerID, rating, agentID, } = this.state;
        return (
            <div>
                <h2>Create Review</h2>
                <form onSubmit={this.handleSubmit}>
                    <input
                        type="text"
                        name="reviewTitle"
                        value={reviewTitle}
                        onChange={this.handleChange}
                        placeholder="Title"
                    />
                    <br />
                    <input
                        type="text"
                        name="reviewBody"
                        value={reviewBody}
                        onChange={this.handleChange}
                        placeholder="Seller email"
                    />
                    <br />
                    <input
                        type="text"
                        name="reviewerID"
                        value={reviewerID}
                        onChange={this.handleChange}
                        placeholder="Description"
                    />
                    <br />
                    <input
                        type="text"
                        name="rating"
                        value={rating}
                        onChange={this.handleChange}
                        placeholder="PropertyType"
                    />
                    <br />
                    <input
                        type="text"
                        name="agentID"
                        value={agentID}
                        onChange={this.handleChange}
                        placeholder="Living Area"
                    />
                    <br />
                    <button type="submit">Submit Review</button>
                </form>
                <div>{this.state.errorMessage}</div>
            </div>
        );
    }
}

export default withRouter(CreateReviewForm);
