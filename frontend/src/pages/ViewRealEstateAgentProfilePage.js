import { Avatar, Box, Button, CardMedia, Container, CssBaseline, Grid, Paper, TextField, Typography } from "@mui/material";
import { Component } from "react";
import axios from "../api/axios";
import AppHeader from "../components/AppHeader";
import CardWithButton from "../material_components/CardWithButton";
import ConfirmationDialog from "../material_components/ConfirmationDialog";
import Footer from "../material_components/Footer";
import { withRouter } from "../withRouter";
import Rating from '@mui/material/Rating';

class ViewRealEstateAgentPage extends Component {

    state;

    constructor(props) {
        super(props)
        this.state = {
            email: '',
            params: props.params,
            auth: props.auth?.auth,
            setAuth: props.auth.setAuth,
            navigate: props.navigate,
            location: props.location,
            userProfile: null,
            agentProfile: null,
            errorMessage: '',
            rating: 0,
            ratingCount: 0,
            newRating: 0,
            reviewBody: '',
            canRate: true,
            canReview: true,
            reviews: [],
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    handleRateSubmit = async (e) => {
        try {
            const response = await axios.post(`/${this.state?.auth?.accountType}/create/review/${this.state.params.id}`, {
                rating: e.target.value
            },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${this.state.auth.token}`
                    },
                    withCredentials: true
                }
            );
            console.log("API Response: ", response?.data);
            this.setState({
                [e.target.name]: e.target.value
            });
            this.setState({
                canRate: false,
            })
            await this.fetchReviews();
        } catch (err) {
            console.log("ERROR: ", err);
            this.setState({
                errorMessage: err.response?.data?.message
            })
        }
    }

    handleReviewSubmit = async (e) => {
        try {
            const response = await axios.put(`/seller/update/review/${this.state.params.id}`, {
                reviewBody: this.state.reviewBody
            },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${this.state.auth.token}`
                    },
                    withCredentials: true
                }
            );
            console.log("API Response: ", response?.data);
            this.setState({
                [e.target.name]: e.target.value
            });
            this.setState({
                canRate: false,
            })
            await this.fetchReviews();
        } catch (err) {
            console.log("ERROR: ", err);
            this.setState({
                errorMessage: err.response?.data?.message
            })
        }
    }

    componentDidMount() {
        // Fetch User Account from server
        this.fetchUserProfile();
        this.fetchRealEstateAgentProfile();
        this.fetchReviews();
    }


    fetchRealEstateAgentProfile = async () => {
        try {
            const response = await axios.get(`/common/view/realestateagent/${this.state.params.id}`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${this.state.auth.token}`
                    },
                    withCredentials: true
                }
            );
            console.log("API Response: ", response?.data);
            this.setState({
                agentProfile: response?.data?.profile,
            })
        } catch (err) {
            console.log("ERROR: ", err);
            this.setState({
                errorMessage: err.response?.data?.message
            })
        }
    }

    fetchUserProfile = async () => {
        try {
            const response = await axios.get(`/common/view/myprofile`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${this.state.auth.token}`
                    },
                    withCredentials: true
                }
            );
            console.log("API Response: ", response?.data);
            this.setState({
                userProfile: response?.data?.profile,
            })
        } catch (err) {
            console.log("ERROR: ", err);
            this.setState({
                errorMessage: err.response?.data?.message
            })
        }
    }

    fetchReviews = async () => {
        try {
            const response = await axios.get(`/common/view/reviews/${this.state?.params?.id}`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${this.state.auth.token}`
                    },
                    withCredentials: true
                }
            );
            console.log("API Response: ", response?.data);
            this.setState({
                reviews: response?.data?.reviews,
                count: response?.data?.reviews?.length,
            })

            let sum = 0;
            response?.data?.reviews.map((review, idx) => {
                sum += review.rating;
                if (review.reviewerProfileId === this.state?.userProfile?.id && review.agentProfileId === this.state.agentProfile.id) {
                    this.setState({
                        canRate: false,
                        newRating: review.rating,
                    })
                    if (review.reviewBody) {
                        this.setState({ canReview: false })
                    }
                }
            })
            this.setState({
                rating: sum
            })
        } catch (err) {
            console.log("ERROR: ", err);
            this.setState({
                errorMessage: err.response?.data?.message
            })
        }

    }

    render() {
        const options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        };
        return (
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    minHeight: '100vh',
                }}
            >

                <CssBaseline />
                <div>
                    <AppHeader title="User Account Details" />
                    <Container maxWidth="lg" sx={{ marginY: 10 }}>
                        <main>
                            {this.state.agentProfile && <Paper elevation={0} sx={{
                                display: 'flex', justifyContent: 'left', pr: 'auto', columnGap: 2,
                                backgroundColor: 'grey.800',
                                color: '#fff',
                                mb: 4,
                                backgroundSize: 'cover',
                                backgroundRepeat: 'no-repeat',
                                backgroundPosition: 'center',
                                backgroundImage: `url(https://source.unsplash.com/random/?art)`,
                            }}>
                                <Paper variant="outlined" sx={{ p: 3, width: '65%', display: 'flex', flexDirection: 'column', justifyContent: 'left', pr: 'auto', columnGap: 10 }}>
                                    <Typography variant='h3' align="left" gutterBottom>
                                        Profile Details
                                        <Typography align="right">Profile ID: {this.state?.agentProfile?.id}</Typography>
                                    </Typography>
                                    <Box sx={{ display: "flex", alignItems: 'center' }}>
                                        <Avatar
                                            alt={this.state?.agentProfile?.firstName}
                                            src={this.state?.agentProfile?.avatar}
                                            sx={{ width: 150, height: 150, mr: 5 }}
                                        />
                                        <Rating
                                            readOnly
                                            value={this.state.rating / this.state.reviews.length || 0}
                                        />
                                        <Typography align="right">({this.state?.reviews.length}) Ratings</Typography>

                                    </Box>
                                    <Paper sx={{ pr: 'auto', display: "flex", gap: 3 }} elevation={0}>
                                        <Paper elevation={0} sx={{ width: '50%' }}>
                                            <Paper sx={{ p: 2, pr: 'auto', }} elevation={0}>
                                                <Typography variant="body1" align="left">
                                                    First Name
                                                </Typography>
                                            </Paper>
                                            <Paper sx={{ p: 3, pr: 'auto', }} variant="outlined">
                                                <Typography variant="body1" align="left">
                                                    {this.state?.agentProfile?.firstName}
                                                </Typography>
                                            </Paper>
                                        </Paper>
                                        <Paper elevation={0} sx={{ width: '50%' }}>
                                            <Paper sx={{ p: 2, pr: 'auto', }} elevation={0}>
                                                <Typography variant="body1" align="left">
                                                    Last Name
                                                </Typography>
                                            </Paper>
                                            <Paper sx={{ p: 3, pr: 'auto', }} variant="outlined">
                                                <Typography variant="body1" align="left">
                                                    {this.state?.agentProfile?.lastName}
                                                </Typography>
                                            </Paper>
                                        </Paper>
                                    </Paper>
                                    <Paper sx={{ p: 2, pr: 'auto', }} elevation={0}>
                                        <Typography variant="body1" align="left">
                                            Bio
                                        </Typography>
                                    </Paper>
                                    <Paper sx={{ p: 3, pr: 'auto', }} variant="outlined">
                                        <Typography variant="body1" align="left">
                                            {this.state?.agentProfile?.bio}
                                        </Typography>
                                    </Paper>
                                    <Paper sx={{ p: 2, pr: 'auto', }} elevation={0}>
                                        <Typography variant="body1" align="left">
                                            Contact Number
                                        </Typography>
                                    </Paper>
                                    <Paper sx={{ p: 3, pr: 'auto', }} variant="outlined">
                                        <Typography variant="body1" align="left">
                                            {this.state?.agentProfile?.contactNumber}
                                        </Typography>
                                    </Paper>
                                    <Paper sx={{ ml: 2, display: "flex", justifyContent: "left", gap: 5, py: 3, pr: 3, }} elevation={0}>
                                        <Typography variant="body1" align="left">
                                            Rate!
                                        </Typography>
                                        {this.state.canRate && <Rating
                                            name="newRating"
                                            value={this.state.newRating}
                                            onChange={this.handleRateSubmit}
                                        />
                                        }
                                        {!this.state.canRate && <Rating
                                            name="newRating"
                                            value={this.state.newRating}
                                            readOnly
                                        />}
                                    </Paper>
                                    {this.state.errorMessage && <Paper sx={{ ml: 2.75, p: 1.5, borderColor: 'red' }} variant='outlined'><Typography variant='subtitle2' color="red" >{this.state.errorMessage}</Typography></Paper>}
                                    {this.state.canReview &&
                                        <TextField sx={{ maxWidth: '100%' }}
                                            value={this.state.reviewBody}
                                            onChange={this.handleChange}
                                            fullWidth
                                            name="reviewBody"
                                            label="Review"
                                        />
                                    }
                                    {this.state.canReview && this.state.reviewBody &&
                                        <Paper sx={{ ml: 'auto', mr: 3, display: "flex", justifyContent: "left", gap: 5, py: 1, pr: 1, }} elevation={0}>
                                            <Button variant='contained' onClick={this.handleReviewSubmit} size="medium">Submit Review</Button>
                                        </Paper>
                                    }
                                </Paper>
                            </Paper>
                            }
                            <Paper sx={{ p: 2, pr: 'auto', }} elevation={0}>
                                <Typography variant="h5" align="left">
                                    Reviews
                                </Typography>
                            </Paper>
                            {this.state.reviews.map((review, idx) => {
                                return (
                                    <Paper sx={{ p: 3, pr: 'auto', }} variant="outlined">
                                        <Paper sx={{ pr: 'auto', display: 'flex', gap: 15 }} elevation={0}>
                                            <Typography variant="h6" align="left">
                                                {review.firstName} {review.lastName}
                                            </Typography>
                                            <Rating
                                                name="newRating"
                                                value={review.rating}
                                                readOnly
                                            />
                                        </Paper>
                                        <Typography variant="body1" align="left" gutterBottom>
                                            {review.reviewBody}
                                        </Typography>
                                        <Typography variant="body1" align="left">
                                            {new Date(review.updatedAt).toLocaleString('en-US', options)}
                                        </Typography>
                                    </Paper>
                                )
                            })}
                        </main>
                    </Container>
                </div>
                <Footer
                    title="Real Estate Management System"
                    description=""
                />
            </Box >
        );
    }
}

export default withRouter(ViewRealEstateAgentPage);
