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
            navigate: props.navigate
        }
    }

    async componentDidMount() {
        // Fetch User
        // await this.fetchUserProfile();
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
                                                Welcome Buyer
                                            </Typography>
                                            <Typography align='left' variant="h5" color="inherit" paragraph>
                                                Discover the best properties in your area with our user-friendly platform. Start your journey towards owning your perfect home now!
                                            </Typography>
                                        </Box>
                                    </Grid>
                                </Grid>
                            </Paper>
                            <Box container spacing={0} sx={{ display: 'flex', justifyContent: 'left', pr: 'auto', columnGap: 10 }}>
                                <CardWithButton
                                    onClick={() => { console.log("CLICKED") }}
                                    title="MarketPlace"
                                    description="Explore the MarketPlace and find properties that suit your needs."
                                    buttonLabel="MarketPlace" />
                                <CardWithButton
                                    onClick={this.handleCreateAccountClick}
                                    title="View Favorites"
                                    description="Browse through properties you have liked."
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

export default withRouter(BuyerHomePage);
