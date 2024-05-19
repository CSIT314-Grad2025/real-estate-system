import { HorizontalRule } from '@mui/icons-material';
import { Box, Button, Card, CardActionArea, Container, CssBaseline, Grid, Paper, TextField, Typography } from '@mui/material';
import React, { Component } from 'react';
import axios from '../api/axios';
import AppHeader from '../components/AppHeader';
import Footer from '../material_components/Footer';
import { withRouter } from '../withRouter';

class SearchUserAccountsPage extends Component {
    state;

    constructor(props) {
        super(props);
        this.state = {
            users: [],
            auth: props.auth?.auth,
            navigate: props.navigate,
            searchTerm: '',
            filteredUsers: [],
        }
    }

    componentDidMount() {
        // Fetch Users from Server
        this.fetchUsers();
    }

    handleClick = (user) => {
        console.log(user);
        this.state.navigate(
            `/systemadmin/view/account/${user.id}`, {
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
            filteredUsers: this.state.users.filter((user, idx) =>
                user?.email.toLowerCase().includes(e.target.value.toLowerCase())
            )
        })
    };

    fetchUsers = async () => {
        try {
            const response = await axios.get(`/systemadmin/search/account`,
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
                users: [...response?.data].sort((a, b) => a.id - b.id),
                filteredUsers: [...response?.data].sort((a, b) => a.id - b.id),
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
                    <AppHeader title="Search User Accounts" />
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
                                    <Typography color={"white"} align='left' variant='subtitle2'> User ID </Typography>
                                </Grid>
                                <Grid item xs={3} md={6}>
                                    <Typography color={"white"} align='left' variant='subtitle2'> Email </Typography>
                                </Grid>
                                <Grid item xs={3} md={3}>
                                    <Typography color={"white"} align='left' variant='subtitle2'> Account Type </Typography>
                                </Grid>
                            </Grid>
                        </Paper>
                        {this.state.filteredUsers.map((user, idx) => (
                            <Row key={user.id} handleClick={this.handleClick} user={user} />
                        ))}
                    </Paper>
                    {this.state.filteredUsers.length === 0 &&
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
        <CardActionArea onClick={() => { props.handleClick(props.user) }} sx={{ px: 2, py: 1 }}>
            <Grid container spacing={2}>
                <Grid item xs={3} md={3}>
                    <Typography color="dimgrey" align='left' sx={{ fontWeight: "700" }} variant='body1'>{props.user.id} </Typography>
                </Grid>
                <Grid item xs={3} md={6}>
                    <Typography align='left' variant='subtitle2'>{props.user.email}</Typography>
                </Grid>
                <Grid item xs={3} md={3}>
                    <Typography color="dimgrey" align='left' sx={{ textTransform: "capitalize", fontWeight: "700" }} variant='subtitle2'>{props.user.accountType}</Typography>
                </Grid>
            </Grid>
        </CardActionArea>
    )
}

export default withRouter(SearchUserAccountsPage);
