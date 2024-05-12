import { AppBar, Box, Button, Card, CardActions, CardContent, Container, CssBaseline, Grid, Grow, Link, Paper, Toolbar, Typography } from '@mui/material';
import React, { Component } from 'react';
import Footer from '../material_components/Footer';
import { withRouter } from '../withRouter';

class SystemAdminHomePage extends Component {
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

    handleLogout = (_e) => {
        window.sessionStorage.clear();
        this.state.navigate("/", { replace: true });
    }

    render() {
        const post = {
            title: 'Title of a longer featured blog post',
            description:
                "Multiple lines of text that form the lede, informing new readers quickly and efficiently about what's most interesting in this post's contents.",
            image: 'https://source.unsplash.com/random?wallpapers',
            imageText: 'main image description',
            linkText: 'Continue reading…',
        };

        return (
            <div>
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
                                            <Typography component="h1" variant="h3" color="inherit" gutterBottom>
                                                Welcome {this.state.auth.firstName}
                                            </Typography>
                                            <Typography variant="h5" color="inherit" paragraph>
                                                Access System Administration tasks and manage user accounts and profiles
                                            </Typography>
                                        </Box>
                                    </Grid>
                                </Grid>
                            </Paper>
                            <Grid container spacing={4}>
                            </Grid>
                        </main>
                    </Container>
                    <Footer
                        title="Footer"
                        description="Something here to give the footer a purpose!"
                    />
                </div>
            </div >
        );
    }
}

export default withRouter(SystemAdminHomePage);
