import { AppBar, Box, Button, Card, CardActions, CardContent, Container, CssBaseline, Grid, Grow, Link, Paper, Toolbar, Typography } from '@mui/material';
import React, { Component } from 'react';
import Footer from '../material_components/Footer';
import { withRouter } from '../withRouter';
import axios from '../api/axios';
import CardWithButton from '../material_components/CardWithButton';
import AppHeader from '../components/AppHeader';

class BuyerHomePage extends Component {
    state;

    constructor(props) {
        super(props);
        console.log(props);
        this.state = {
            auth: props.auth.auth,
            setAuth: props.auth.setAuth,
            navigate: props.navigate,
            userProfile: props.userProfile,
        }
    }

    componentDidMount() {
        // Fetch User
        this.fetchUserProfile();
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

    handleMarketPlaceClick = () => {
        this.state.navigate("/buyer/search/listing",);
    }
    handleSearchRealEstateAgentsClick = () => {
        this.state.navigate("/buyer/search/realestateagent",);
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
                    <AppHeader title="Buyer Home" />
                    {this.state.userProfile && <Container maxWidth="lg" sx={{ marginY: 10 }}>
                        <main>
                            <Paper
                                sx={{
                                    position: 'relative',
                                    backgroundColor: 'grey.800',
                                    color: '#fff',
                                    mb: 4,
                                    backgroundSize: 'cover',
                                    backgroundRepeat: 'no-repeat',
                                    backgroundPosition: 'center',
                                    backgroundImage: `url(https://source.unsplash.com/random/?house)`,
                                }}
                            >
                                <Box
                                    sx={{
                                        position: 'absolute',
                                        top: 0,
                                        bottom: 0,
                                        right: 0,
                                        left: 0,
                                        backgroundColor: 'rgba(0,0,0,.5)',
                                    }}
                                />
                                <Grid container>
                                    <Grid item md={6}>
                                        <Box
                                            sx={{
                                                position: 'relative',
                                                p: { xs: 3, md: 6 },
                                                pr: { md: 0 },
                                            }}
                                        >
                                            <Typography align='left' component="h1" variant="h3" color="inherit" gutterBottom>
                                                Welcome {this.state?.userProfile?.firstName}
                                            </Typography>
                                            <Typography align='left' variant="h5" color="inherit" paragraph>
                                                Find your dream property effortlessly with our comprehensive listings and trusted real estate agents.
                                            </Typography>
                                        </Box>
                                    </Grid>
                                </Grid>
                            </Paper>
                            <Box container spacing={0} sx={{ display: 'flex', justifyContent: 'left', pr: 'auto', columnGap: 10 }}>
                                <CardWithButton
                                    onClick={this.handleMarketPlaceClick}
                                    title="Search Properties"
                                    description="Access the marketplace and start searching for properties to your liking."
                                    buttonLabel="Market Place" />
                                <CardWithButton
                                    onClick={this.handleSearchRealEstateAgentsClick}
                                    title="Search Real Estate Agents"
                                    description="Look for Real Estate Agents to assist you on your acquisition journey"
                                    buttonLabel="Real Estate Agents" />
                                <CardWithButton
                                    onClick={this.handleMyProfileClick}
                                    title="My Profile"
                                    description="View and manage your profile"
                                    buttonLabel="My Profile" />
                            </Box>
                        </main>
                    </Container>}
                    {!this.state.userProfile &&
                        <Box
                            sx={{
                                position: 'relative',
                                p: { xs: 3, md: 6 },
                                pr: { md: 0 },
                            }}
                        >
                            <Typography align='left' component="h1" variant="h3" color="inherit" gutterBottom>
                                User Profile not set up!
                            </Typography>
                            <Typography align='left' variant="h5" color="inherit" paragraph>
                                This User Account does not have a Profile set up for it.
                                A valid User Profile is required to use the system.
                            </Typography>
                        </Box>
                    }
                </div>
                <Footer
                    title="Real Estate Management System"
                    description=""
                />
            </Box >
        );
    }
}

export default withRouter(BuyerHomePage);
