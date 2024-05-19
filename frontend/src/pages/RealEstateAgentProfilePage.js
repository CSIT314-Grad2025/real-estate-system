import { Avatar, Box, Button, CardMedia, Container, CssBaseline, Grid, Paper, Typography } from "@mui/material";
import { Component } from "react";
import axios from "../api/axios";
import AppHeader from "../components/AppHeader";
import CardWithButton from "../material_components/CardWithButton";
import ConfirmationDialog from "../material_components/ConfirmationDialog";
import Footer from "../material_components/Footer";
import { withRouter } from "../withRouter";

class RealEstateAgentProfilePage extends Component {

    state;

    constructor(props) {
        super(props)
        this.state = {
            email: '',
            params: props.params,
            auth: props.auth?.auth,
            setAuth: props.auth.setAuth,
            navigate: props.navigate,
            userAccount: null,
            location: props.location,
            userProfile: null,
            errorMessage: '',
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    componentDidMount() {
        // Fetch User Profile from server
        this.fetchUserProfile();
    }

    handleMyListingsClick = () => {
        this.state.navigate("/realestateagent/view/my/listing");
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
        }
    }

    render() {
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
                    <AppHeader title="Your Profile" />
                    <Container maxWidth="lg" sx={{ marginY: 10 }}>
                        <main>
                            {this.state.userProfile &&
                                <Paper elevation={0} sx={{ width: '100%', display: 'flex', justifyContent: 'left', pr: 'auto', columnGap: 10 }}>
                                    <Paper variant="outlined" sx={{ p: 3, width: '65%', display: 'flex', flexDirection: 'column', justifyContent: 'left', pr: 'auto', columnGap: 10 }}>
                                        <Typography variant='h3' align="left" gutterBottom>
                                            Your Profile
                                        </Typography>
                                        <Avatar
                                            alt={this.state?.userProfile?.firstName}
                                            src={this.state?.userProfile?.avatar}
                                            sx={{ width: 150, height: 150 }}
                                        />
                                        <Paper sx={{ pr: 'auto', display: "flex", gap: 3 }} elevation={0}>
                                            <Paper elevation={0} sx={{ width: '50%' }}>
                                                <Paper sx={{ p: 2, pr: 'auto', }} elevation={0}>
                                                    <Typography variant="body1" align="left">
                                                        First Name
                                                    </Typography>
                                                </Paper>
                                                <Paper sx={{ p: 3, pr: 'auto', }} variant="outlined">
                                                    <Typography variant="body1" align="left">
                                                        {this.state?.userProfile?.firstName}
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
                                                        {this.state?.userProfile?.lastName}
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
                                                {this.state?.userProfile?.bio}
                                            </Typography>
                                        </Paper>
                                        <Paper sx={{ p: 2, pr: 'auto', }} elevation={0}>
                                            <Typography variant="body1" align="left">
                                                Contact Number
                                            </Typography>
                                        </Paper>
                                        <Paper sx={{ p: 3, pr: 'auto', }} variant="outlined">
                                            <Typography variant="body1" align="left">
                                                {this.state?.userProfile?.contactNumber}
                                            </Typography>
                                        </Paper>
                                    </Paper>
                                    <CardWithButton
                                        onClick={this.handleMyListingsClick}
                                        title="Your Property Listings"
                                        description="View and manage your property listings"
                                        buttonLabel="My Listings" />
                                </Paper>
                            }
                            <Paper elevation={0} sx={{
                                display: 'flex', justifyContent: 'left', pr: 'auto', columnGap: 2, mb: 4,
                            }}>

                            </Paper>
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

export default withRouter(RealEstateAgentProfilePage);
