import { Box, Button, CardMedia, Container, CssBaseline, Grid, Paper, Typography } from "@mui/material";
import { Component } from "react";
import axios from "../api/axios";
import AppHeader from "../components/AppHeader";
import CardWithButton from "../material_components/CardWithButton";
import Footer from "../material_components/Footer";
import { withRouter } from "../withRouter";

class ViewUserAccountPage extends Component {

    state;

    constructor(props) {
        super(props)
        this.state = {
            email: '',
            params: props.params,
            auth: props.auth?.auth,
            navigate: props.navigate,
            userAccount: null,
            userProfile: null,
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    componentDidMount() {
        // Fetch User Account from server
        this.fetchUserAccount();
        this.fetchUserProfile();
    }

    fetchUserAccount = async () => {
        try {
            const response = await axios.get(`/systemadmin/view/account/${this.state.params.id}`,
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
                userAccount: response?.data?.account,
            })
        } catch (err) {
            console.log("ERROR: ", err);
        }
    }

    fetchUserProfile = async () => {
        try {
            const response = await axios.get(`/systemadmin/view/profile/byaccount/${this.state.params.id}`,
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


    handleSubmit = (e) => {
        e.preventDefault();
        const { email } = this.state;
    };

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
                    <AppHeader title="User Account Details" />
                    <Container maxWidth="lg" sx={{ marginY: 10 }}>
                        <main>
                            <Paper elevation={0} sx={{
                                display: 'flex', justifyContent: 'left', pr: 'auto', columnGap: 2,
                                backgroundColor: 'grey.800',
                                color: '#fff',
                                mb: 4,
                                backgroundSize: 'cover',
                                backgroundRepeat: 'no-repeat',
                                backgroundPosition: 'center',
                                backgroundImage: `url(https://source.unsplash.com/random/?geometry)`,
                            }}>
                                <Paper variant="outlined" sx={{ p: 3, width: '65%', display: 'flex', flexDirection: 'column', justifyContent: 'left', pr: 'auto', columnGap: 10 }}>
                                    <Typography variant='h3' align="left" gutterBottom>
                                        Account Details
                                        <Typography align="right">User ID: {this.state?.userAccount?.id}</Typography>
                                    </Typography>
                                    <Paper sx={{ p: 2, pr: 'auto', }} elevation={0}>
                                        <Typography variant="body1" align="left">
                                            Email
                                        </Typography>
                                    </Paper>
                                    <Paper sx={{ p: 3, pr: 'auto', }} variant="outlined">
                                        <Typography variant="body1" align="left">
                                            {this.state?.userAccount?.email}
                                        </Typography>
                                    </Paper>
                                    <Paper sx={{ p: 2, pr: 'auto', }} elevation={0}>
                                        <Typography variant="body1" align="left">
                                            Password
                                        </Typography>
                                    </Paper>
                                    <Paper sx={{ p: 3, pr: 'auto', }} variant="outlined">
                                        <Typography variant="body1" align="left">
                                            {this.state?.userAccount?.password}
                                        </Typography>
                                    </Paper>
                                    <Paper sx={{ display: "flex", justifyContent: "right", gap: 5, py: 3, pr: 3, pr: 'auto', }} elevation={0}>
                                        <Button variant='contained' onClick={() => { }} size="medium">Edit</Button>
                                        <Button variant='outlined' onClick={() => { }} color='error' size="medium">Delete</Button>
                                    </Paper>
                                </Paper>
                            </Paper>
                            <Box container spacing={0} sx={{ display: 'flex', justifyContent: 'left', pr: 'auto', columnGap: 10 }}>
                                <CardWithButton
                                    onClick={this.handleCreateAccountClick}
                                    title="Create User Account"
                                    description="Create a new user account. A user account enables a user to be authenticated into the system. An account is required to setup a profile."
                                    buttonLabel="Create Account" />
                                <CardWithButton
                                    onClick={this.handleSearchClick}
                                    title="Search Users"
                                    description="Search for existing user accounts to perform adminsitrative tasks"
                                    buttonLabel="Search" />
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

export default withRouter(ViewUserAccountPage);
