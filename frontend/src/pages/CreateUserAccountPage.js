import { AppBar, Box, Button, Card, CardActions, CardContent, Container, CssBaseline, Grid, Grow, InputLabel, Link, Paper, Select, Toolbar, Typography } from '@mui/material';
import React, { Component } from 'react';
import Footer from '../material_components/Footer';
import { withRouter } from '../withRouter';
import axios from '../api/axios';
import MenuItem from '@mui/material/MenuItem';
import FormLabel from '@mui/material/FormLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import { styled } from '@mui/system';

class CreateUserAccountPage extends Component {
    state;

    constructor(props) {
        super(props);
        console.log(props);
        this.state = {
            auth: props.auth.auth,
            setAuth: props.auth.setAuth,
            navigate: props.navigate,
            email: "",
            password: "",
            confirmPassword: "",
            accountType: "",
            errorMessage: "Error fetching user"
        }
    }

    async componentDidMount() {
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };


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

    handleSubmit = async () => {
        const { email, password, accountType } = this.state;
        try {
            const payload = {
                email,
                password,
                accountType
            }
            console.log("Payload", payload)
            const response = await axios.put(`/systemadmin/create`, payload, {
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
                                Create User Account
                            </Typography>
                            <Button color="inherit" onClick={this.handleLogout}>Logout</Button>
                        </Toolbar>
                    </AppBar>
                    <Container maxWidth="sm" sx={{ marginY: 10 }}>
                        <Grid component="form" onSubmit={this.handleSubmit} container spacing={3}>
                            {this.state.errorMessage && <Typography color="red" sx={{ mx: "auto" }}>{this.state.errorMessage}</Typography>}
                            <FormGrid item xs={12}>
                                <FormLabel required sx={{ textAlign: 'left' }}>
                                    Email
                                </FormLabel>
                                <OutlinedInput
                                    id="email"
                                    name="email"
                                    value={this.state.email}
                                    onChange={this.handleChange}
                                    placeholder="Email"
                                    required
                                />
                            </FormGrid>
                            <FormGrid item xs={12}>
                                <FormLabel required sx={{ textAlign: 'left' }}>
                                    Password
                                </FormLabel>
                                <OutlinedInput
                                    id="password"
                                    name="password"
                                    onChange={this.handleChange}
                                    value={this.state.password}
                                    type="password"
                                    placeholder="Password"
                                    required
                                />
                            </FormGrid>
                            <FormGrid item xs={12}>
                                <FormLabel required sx={{ textAlign: 'left' }}>
                                    Confirm Password
                                </FormLabel>
                                <OutlinedInput
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    onChange={this.handleChange}
                                    value={this.state.confirmPassword}
                                    type="password"
                                    placeholder="Retype Password"
                                    required
                                />
                            </FormGrid>
                            <FormGrid item xs={12}>
                                <FormLabel required sx={{ textAlign: 'left' }}>
                                    Account Type
                                </FormLabel>
                                <Select
                                    name="accountType"
                                    value={this.state.accountType}
                                    required
                                    onChange={this.handleChange}
                                >
                                    <MenuItem value="rea">Real Estate Agent</MenuItem>
                                    <MenuItem value="buyer">Buyer</MenuItem>
                                    <MenuItem value="seller">Seller</MenuItem>
                                    <MenuItem value="systemadmin">System Administrator</MenuItem>
                                </Select>
                            </FormGrid>
                            <Button
                                type="submit"
                                variant="contained"
                                sx={{ mt: 3, mb: 2, mx: 'auto' }}
                            >
                                Create User
                            </Button>
                        </Grid>
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
const FormGrid = styled(Grid)(() => ({
    display: 'flex',
    flexDirection: 'column',
}));

export default withRouter(CreateUserAccountPage);
