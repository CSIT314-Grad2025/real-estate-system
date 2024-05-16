import { Box, Button, Container, CssBaseline, Grid, Paper, Select, Typography } from '@mui/material'; import React, { Component } from 'react';
import Footer from '../material_components/Footer';
import { withRouter } from '../withRouter';
import axios from '../api/axios';
import MenuItem from '@mui/material/MenuItem';
import FormLabel from '@mui/material/FormLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import { styled } from '@mui/system';
import AppHeader from '../components/AppHeader';

class CreateUserAccountPage extends Component {
    state;

    constructor(props) {
        super(props);
        this.state = {
            auth: props.auth.auth,
            setAuth: props.auth.setAuth,
            navigate: props.navigate,
            email: "",
            password: "",
            confirmPassword: "",
            accountType: "",
            errorMessage: ""
        }
    }

    async componentDidMount() {
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };


    handleSubmit = async (e) => {
        e.preventDefault();
        const { email, password, accountType } = this.state;
        try {
            const payload = {
                email,
                password,
                accountType
            }
            const response = await axios.post(`/systemadmin/create/account`, payload, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.state.auth.token}`
                },
                withCredentials: true
            }
            );
            console.log("API Response: ", response?.data);
            this.state.navigate("/confirmation", { state: { title: "Success!", description: "User Account created successfully.", } }, { replace: true });
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
                    <AppHeader title="Create User Account" />
                    <Container maxWidth="sm" sx={{ marginY: 10 }}>
                        <Grid component="form" onSubmit={this.handleSubmit} container spacing={3}>
                            {this.state.errorMessage && <Paper sx={{ ml: 2.75, p: 1.5, borderColor: 'red' }} variant='outlined'><Typography variant='subtitle2' color="red" >{this.state.errorMessage}</Typography></Paper>}
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
