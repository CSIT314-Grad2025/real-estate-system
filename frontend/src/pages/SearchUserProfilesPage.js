import { HorizontalRule } from '@mui/icons-material';
import { Box, Button, Card, CardActionArea, Container, CssBaseline, Grid, Paper, TextField, Typography } from '@mui/material';
import React, { Component } from 'react';
import axios from '../api/axios';
import AppHeader from '../components/AppHeader';
import Footer from '../material_components/Footer';
import { withRouter } from '../withRouter';

class SearchUserProfilesPage extends Component {
    state;

    constructor(props) {
        super(props);
        this.state = {
            userProfiles: [],
            auth: props.auth?.auth,
            navigate: props.navigate,
            searchTerm: '',
            filteredUserProfiles: [],
        }
    }

    componentDidMount() {
        // Fetch Users from Server
        this.fetchUserProfiles();
    }

    handleClick = (userProfile) => {
        console.log(userProfile);
        this.state.navigate(
            `/systemadmin/view/account/${userProfile.accountId}`, {
            state: {
                from: this.state.location
            }
        }, { replace: true });
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });

        this.setState({
            filteredUserProfiles: this.state.userProfiles.filter((userProfile, idx) =>
                userProfile?.firstName.toLowerCase().includes(e.target.value.toLowerCase()) ||
                userProfile?.lastName.toLowerCase().includes(e.target.value.toLowerCase())
            )
        })
    };

    fetchUserProfiles = async () => {
        try {
            const response = await axios.get(`/systemadmin/search/profile`,
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
                userProfiles: [...response?.data].sort((a, b) => a.id - b.id),
                filteredUserProfiles: [...response?.data].sort((a, b) => a.id - b.id),
            })
        } catch (err) {
            console.log("ERROR: ", err);
        }
    }


    handleSubmit = (e) => {
        e.preventDefault();
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
                    <AppHeader title="Search User Profiles" />
                    <TextField sx={{ marginY: 3, maxWidth: '50%', mx: 'auto', }}
                        value={this.state.searchTerm}
                        autoFocus
                        onChange={this.handleChange}
                        fullWidth
                        name="searchTerm"
                        label="Search"
                    />
                    <Paper variant='outlined' sx={{ marginTop: 10, maxWidth: '50%', mx: 'auto', }}>
                        <Paper sx={{ p: 2, backgroundColor: "#5c6bc0" }} elevation={0}>
                            <Grid container spacing={2}>
                                <Grid item xs={3} md={3}>
                                    <Typography color={"white"} align='left' variant='subtitle2'> Profile ID </Typography>
                                </Grid>
                                <Grid item xs={3} md={3}>
                                    <Typography color={"white"} align='left' variant='subtitle2'> Account ID </Typography>
                                </Grid>
                                <Grid item xs={3} md={3}>
                                    <Typography color={"white"} align='left' variant='subtitle2'> First Name </Typography>
                                </Grid>
                                <Grid item xs={3} md={3}>
                                    <Typography color={"white"} align='left' variant='subtitle2'> Last Name </Typography>
                                </Grid>
                            </Grid>
                        </Paper>
                        {this.state.filteredUserProfiles.map((userProfile, idx) => (
                            <Row key={userProfile.id} handleClick={this.handleClick} userProfile={userProfile} />
                        ))}
                    </Paper>
                    {this.state.filteredUserProfiles.length === 0 &&
                        <Paper variant='outlined' sx={{ maxWidth: '50%', mx: 'auto', }}>
                            <Paper sx={{ p: 10, }} elevation={0}>
                                <Typography variant='subtitle2'>No matches found!</Typography>
                            </Paper>
                        </Paper>
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

const Row = (props) => {
    return (
        <CardActionArea onClick={() => { props.handleClick(props.userProfile) }} sx={{ px: 2, py: 1 }}>
            <Grid container spacing={2}>
                <Grid item xs={3} md={3}>
                    <Typography color="dimgrey" align='left' sx={{ px: 3, fontWeight: "700" }} variant='body1'>{props.userProfile.id} </Typography>
                </Grid>
                <Grid item xs={3} md={3}>
                    <Typography color="dimgrey" align='left' sx={{ px: 3, fontWeight: "700" }} variant='body1'>{props.userProfile.accountId} </Typography>
                </Grid>
                <Grid item xs={3} md={3}>
                    <Typography align='left' sx={{ px: 0.5, }} variant='subtitle2'>{props.userProfile.firstName}</Typography>
                </Grid>
                <Grid item xs={3} md={3}>
                    <Typography align='left' sx={{ px: 0.5, }} variant='subtitle2'>{props.userProfile.lastName}</Typography>
                </Grid>
            </Grid>
        </CardActionArea>
    )
}

export default withRouter(SearchUserProfilesPage);
