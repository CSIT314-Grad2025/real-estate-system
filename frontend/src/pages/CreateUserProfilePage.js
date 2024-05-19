import { Box, Button, Container, CssBaseline, Grid, Paper, Typography } from '@mui/material'; import React, { Component } from 'react';
import Footer from '../material_components/Footer';
import { withRouter } from '../withRouter';
import axios from '../api/axios';
import FormLabel from '@mui/material/FormLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import { styled } from '@mui/system';
import AppHeader from '../components/AppHeader';

class CreateUserProfilePage extends Component {
    state;

    constructor(props) {
        super(props);
        this.state = {
            auth: props.auth.auth,
            setAuth: props.auth.setAuth,
            navigate: props.navigate,
            location: props.location,
            params: props.params,
            errorMessage: "",
            firstName: '',
            lastName: '',
            bio: '',
            contactNumber: '',
            avatar: '',
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
        const {
            firstName,
            lastName,
            bio,
            contactNumber,
            avatar,
        } = this.state;

        try {
            const payload = {
                firstName,
                lastName,
                bio,
                contactNumber,
                avatar,
            }
            const response = await axios.post(`/systemadmin/create/profile/${this.state.params.id}`, payload, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.state.auth.token}`
                },
                withCredentials: true
            }
            );
            console.log("API Response: ", response?.data);
            this.state.navigate(
                "/confirmation", {
                state: {
                    title: "Success!",
                    description: "User Profile created successfully.",
                    from: { pathname: `/systemadmin/view/account/${this.state.params.id}` }
                }
            }, { replace: true });
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
                    <AppHeader title="Create User Profile" />
                    <Container maxWidth="sm" sx={{ marginY: 10 }}>
                        <Grid component="form" onSubmit={this.handleSubmit} container spacing={3}>
                            {this.state.errorMessage && <Paper sx={{ ml: 2.75, p: 1.5, borderColor: 'red' }} variant='outlined'><Typography variant='subtitle2' color="red" >{this.state.errorMessage}</Typography></Paper>}
                            <FormGrid item xs={12}>
                                <FormLabel required sx={{ textAlign: 'left' }}>
                                    First Name
                                </FormLabel>
                                <OutlinedInput
                                    id="firstName"
                                    name="firstName"
                                    value={this.state.firstName}
                                    onChange={this.handleChange}
                                    placeholder="First Name"
                                    required
                                />
                            </FormGrid>
                            <FormGrid item xs={12}>
                                <FormLabel required sx={{ textAlign: 'left' }}>
                                    Last Name
                                </FormLabel>
                                <OutlinedInput
                                    id="lastName"
                                    name="lastName"
                                    value={this.state.lastName}
                                    onChange={this.handleChange}
                                    placeholder="Last Name"
                                    required
                                />
                            </FormGrid>
                            <FormGrid item xs={12}>
                                <FormLabel required sx={{ textAlign: 'left' }}>
                                    Bio
                                </FormLabel>
                                <OutlinedInput
                                    id="bio"
                                    name="bio"
                                    value={this.state.bio}
                                    onChange={this.handleChange}
                                    placeholder="Bio"
                                    required
                                />
                            </FormGrid>
                            <FormGrid item xs={12}>
                                <FormLabel required sx={{ textAlign: 'left' }}>
                                    Contact Number
                                </FormLabel>
                                <OutlinedInput
                                    id="contactNumber"
                                    name="contactNumber"
                                    value={this.state.contactNumber}
                                    onChange={this.handleChange}
                                    placeholder="Contact No."
                                    required
                                />
                            </FormGrid>
                            <FormGrid item xs={12}>
                                <FormLabel required sx={{ textAlign: 'left' }}>
                                    Avatar
                                </FormLabel>
                                <OutlinedInput
                                    id="avatar"
                                    name="avatar"
                                    onChange={this.handleChange}
                                    value={this.state.avatar}
                                    type="avatar"
                                    placeholder="url"
                                    required
                                />
                            </FormGrid>
                            <Button
                                type="submit"
                                variant="contained"
                                sx={{ mt: 3, mb: 2, mx: 'auto' }}
                            >
                                Create Profile
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

export default withRouter(CreateUserProfilePage);
