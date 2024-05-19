import { AppBar, Box, Button, Card, CardActions, CardContent, Container, CssBaseline, Grid, Grow, Link, Paper, Toolbar, Typography } from '@mui/material';
import React, { Component } from 'react';
import Footer from '../material_components/Footer';
import { withRouter } from '../withRouter';
import axios from '../api/axios';
import CardWithButton from '../material_components/CardWithButton';
import AppHeader from '../components/AppHeader';

class SystemAdminHomePage extends Component {
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
        this.state.navigate("/systemadmin/create",);
    }
    handleSearchAccountsClick = () => {
        this.state.navigate("/systemadmin/search",);
    }
    handleSearchProfilesClick = () => {
        this.state.navigate("/systemadmin/search/profile",);
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
                    <AppHeader title="System Admin Home" />
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
                                    title="Create User Account"
                                    description="Create a new user account. A user account enables a user to be authenticated into the system. An account is required to setup a profile."
                                    buttonLabel="Create Account" />
                                <CardWithButton
                                    onClick={this.handleSearchAccountsClick}
                                    title="Search Accounts"
                                    description="Search for existing user accounts to perform adminsitrative tasks"
                                    buttonLabel="Search" />
                                <CardWithButton
                                    onClick={this.handleSearchProfilesClick}
                                    title="Search Profiles"
                                    description="Search for existing user profiles to perform adminsitrative tasks"
                                    buttonLabel="Search" />
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

export default withRouter(SystemAdminHomePage);
