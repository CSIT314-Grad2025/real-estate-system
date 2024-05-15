import { AppBar, Box, Button, Card, CardActions, CardContent, Container, CssBaseline, Grid, Grow, Link, Paper, Toolbar, Typography } from '@mui/material';
import React, { Component } from 'react';
import Footer from '../material_components/Footer';
import { withRouter } from '../withRouter';
import axios from '../api/axios';
import CardWithButton from '../material_components/CardWithButton';

class RealEstateAgentHomePage extends Component {
    state;

    constructor(props) {
        super(props);
        console.log(props);
        this.state = {
            auth: props.auth.auth,
            setAuth: props.auth.setAuth,
            navigate: props.navigate
        }
    }

    async componentDidMount() {
        // Fetch User
        await this.fetchUserProfile();
    }

    fetchUserProfile = async () => {
        try {
            const response = await axios.get(`/${this.state.auth.accountType}/logout`, {}, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.state.auth.token}`
                },
                withCredentials: true
            }
            );
            console.log("API Response: ", response?.data);
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
    }

    handleCreateAccountClick = () => {
        this.state.navigate("/systemadmin/create", { replace: true });
    }

    handleLogout = async (_e) => {
        console.log(this.state.auth)
        try {
            const response = await axios.put(`/${this.state.auth.accountType}/logout`, {}, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.state.auth.token}`
                },
                withCredentials: true
            }
            );
            console.log("API Response: ", response?.data);
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
        window.sessionStorage.clear();
        this.state.navigate("/", { replace: true });
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
                    <AppBar position="static">
                        <Toolbar>
                            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                                System Admin Home
                            </Typography>
                            <Button color="inherit" onClick={this.handleLogout}>Logout</Button>
                        </Toolbar>
                    </AppBar>
                    <Container maxWidth="lg" sx={{ marginY: 10 }}>
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
                                {/* Increase the priority of the hero background image */}
                                {<img style={{ display: 'none' }} src={"url(https://source.unsplash.com/random/900×700/?fruit)"} alt={""} />}
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
                                                Welcome Real Estate Agent
                                            </Typography>
                                            <Typography align='left' variant="h5" color="inherit" paragraph>
                                                Get started with setting up and managing Property Listings for your clients.
                                            </Typography>
                                        </Box>
                                    </Grid>
                                </Grid>
                            </Paper>
                            <Box container spacing={0} sx={{ display: 'flex', justifyContent: 'left', pr: 'auto', columnGap: 10 }}>
                                <CardWithButton
                                    onClick={console.log("CLICKED")}
                                    title="Create Property Listing"
                                    description="Create a new Property Listing. Listed properties will appear on the markertplace for buyers to view."
                                    buttonLabel="Create Listing" />
                                <CardWithButton
                                    onClick={() => { console.log("CLICKED") }}
                                    title="My Listings"
                                    description="View properties listed by you"
                                    buttonLabel="View" />
                            </Box>
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

export default withRouter(RealEstateAgentHomePage);
