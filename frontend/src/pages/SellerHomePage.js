import { AppBar, Box, Button, Card, CardActions, CardContent, Container, CssBaseline, Grid, Grow, Link, Paper, Toolbar, Typography } from '@mui/material';
import React, { Component } from 'react';
import Footer from '../material_components/Footer';
import { withRouter } from '../withRouter';
import axios from '../api/axios';
import CardWithButton from '../material_components/CardWithButton';
import AppHeader from '../components/AppHeader';

class SellerHomePage extends Component {
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

    handleCreateAccountClick = () => {
        // this.state.navigate("/systemadmin/create", { replace: true });
    }
    handleSearchClick = () => {
        // this.state.navigate("/systemadmin/search", { replace: true });
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
                    <AppHeader title="Seller Admin Home" />
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
                                                Get started with setting up and managing User Accounts / User Profiles
                                            </Typography>
                                        </Box>
                                    </Grid>
                                </Grid>
                            </Paper>
                            <Box container spacing={0} sx={{ display: 'flex', justifyContent: 'left', pr: 'auto', columnGap: 10 }}>
                                <CardWithButton
                                    onClick={this.handleCreateAccountClick}
                                    title="Your Listings"
                                    description="View your property listings, see if buyers are interested."
                                    buttonLabel="My Properties" />
                                <CardWithButton
                                    onClick={this.handleSearchClick}
                                    title="Search Real Estate Agents"
                                    description="Look for Real Estate Agents to assist you with your property sales."
                                    buttonLabel="Real Estate Agents" />
                                <CardWithButton
                                    onClick={this.handleSearchClick}
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

export default withRouter(SellerHomePage);
