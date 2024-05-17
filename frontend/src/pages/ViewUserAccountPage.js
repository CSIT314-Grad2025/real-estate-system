import { Avatar, Box, Button, CardMedia, Container, CssBaseline, Grid, Paper, Typography } from "@mui/material";
import { Component } from "react";
import axios from "../api/axios";
import AppHeader from "../components/AppHeader";
import CardWithButton from "../material_components/CardWithButton";
import ConfirmationDialog from "../material_components/ConfirmationDialog";
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
            setAuth: props.auth.setAuth,
            navigate: props.navigate,
            userAccount: null,
            location: props.location,
            userProfile: null,
            errorMessage: '',
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

    handleUpdateAccountClick = () => {
        console.log();
        this.state.navigate(
            `/systemadmin/update/account/${this.state?.userAccount?.id}`, {
            state: {
                from: this.state.location
            }
        }, { replace: true });
    }

    handleCreateProfileClick = () => {
        console.log();
        this.state.navigate(
            `/systemadmin/create/profile/${this.state?.userAccount?.id}`, {
            state: {
                from: this.state.location
            }
        }, { replace: true });
    }

    handleDeleteAccountClick = async () => {
        try {
            const response = await axios.delete(`/systemadmin/delete/account/${this.state?.userAccount?.id}`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${this.state.auth.token}`
                    },
                    withCredentials: true
                }
            );
            console.log("API Response: ", response);
            this.state.navigate(
                "/confirmation", {
                state: {
                    title: "Success!",
                    description: "User Account deleted successfully.",
                    from: {
                        pathname: "/systemadmin/search"
                    }
                }
            }, { replace: true });
        } catch (err) {
            console.log("ERROR: ", err);
            this.setState({
                errorMessage: err.response?.data?.message || "ERROR",
            })
        }
    }

    handleDeleteProfileClick = async () => {
        try {
            const response = await axios.delete(`/systemadmin/delete/profile/${this.state?.userProfile?.id}`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${this.state.auth.token}`
                    },
                    withCredentials: true
                }
            );
            console.log("API Response: ", response);
            this.state.navigate(
                "/confirmation", {
                state: {
                    title: "Success!",
                    description: "User Profile deleted successfully.",
                    from: this.state.location,
                }
            }, { replace: true });
        } catch (err) {
            console.log("ERROR: ", err);
        }
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
                                    {this.state.errorMessage && <Paper sx={{ borderColor: 'red', p: 3, pr: 'auto', }} variant="outlined">
                                        <Typography variant="body1" color='red' align="left">
                                            {this.state?.errorMessage}
                                        </Typography>
                                    </Paper>}
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
                                    <Paper sx={{ display: "flex", justifyContent: "right", gap: 5, py: 3, pr: 3, }} elevation={0}>
                                        <Button variant='contained' onClick={this.handleUpdateAccountClick} size="medium">Edit</Button>
                                        <ConfirmationDialog
                                            title="Confirmation"
                                            description="Are you sure you want to proceed?"
                                            response={this.handleDeleteAccountClick}
                                        >
                                            {(showDialog) => (
                                                <Button variant='outlined' onClick={showDialog} color='error' size="medium">Delete</Button>
                                            )}
                                        </ConfirmationDialog>
                                    </Paper>
                                </Paper>
                            </Paper>
                            {!this.state.userProfile &&
                                <CardWithButton
                                    onClick={this.handleCreateProfileClick}
                                    title="Create User Profile"
                                    description="This User Account does not have a User Profile setup. A User Profile is required before a User can start using the system."
                                    buttonLabel="Create Profile" />
                            }
                            {this.state.userProfile && <Paper elevation={0} sx={{
                                display: 'flex', justifyContent: 'left', pr: 'auto', columnGap: 2,
                                backgroundColor: 'grey.800',
                                color: '#fff',
                                mb: 4,
                                backgroundSize: 'cover',
                                backgroundRepeat: 'no-repeat',
                                backgroundPosition: 'center',
                                backgroundImage: `url(https://source.unsplash.com/random/?art)`,
                            }}>
                                <Paper variant="outlined" sx={{ p: 3, width: '65%', display: 'flex', flexDirection: 'column', justifyContent: 'left', pr: 'auto', columnGap: 10 }}>
                                    <Typography variant='h3' align="left" gutterBottom>
                                        Profile Details
                                        <Typography align="right">Profile ID: {this.state?.userProfile?.id}</Typography>
                                    </Typography>
                                    <Avatar
                                        alt={this.state?.userProfile?.firstName}
                                        src={this.state?.userProfile?.avatar}
                                        sx={{ width: 150, height: 150 }}
                                    />
                                    <Paper sx={{ pr: 'auto', display: "flex", gap: 3 }} elevation={0}>
                                        <Paper elevation={0} sx={{ width: '50%' }}>
                                            <Paper sx={{ p: 2, pr: 'auto', }} elevation={0}>
                                                <Typography variant="body1" align="left">
                                                    First Name
                                                </Typography>
                                            </Paper>
                                            <Paper sx={{ p: 3, pr: 'auto', }} variant="outlined">
                                                <Typography variant="body1" align="left">
                                                    {this.state?.userProfile?.firstName}
                                                </Typography>
                                            </Paper>
                                        </Paper>
                                        <Paper elevation={0} sx={{ width: '50%' }}>
                                            <Paper sx={{ p: 2, pr: 'auto', }} elevation={0}>
                                                <Typography variant="body1" align="left">
                                                    Last Name
                                                </Typography>
                                            </Paper>
                                            <Paper sx={{ p: 3, pr: 'auto', }} variant="outlined">
                                                <Typography variant="body1" align="left">
                                                    {this.state?.userProfile?.lastName}
                                                </Typography>
                                            </Paper>
                                        </Paper>
                                    </Paper>
                                    <Paper sx={{ p: 2, pr: 'auto', }} elevation={0}>
                                        <Typography variant="body1" align="left">
                                            Bio
                                        </Typography>
                                    </Paper>
                                    <Paper sx={{ p: 3, pr: 'auto', }} variant="outlined">
                                        <Typography variant="body1" align="left">
                                            {this.state?.userProfile?.bio}
                                        </Typography>
                                    </Paper>
                                    <Paper sx={{ p: 2, pr: 'auto', }} elevation={0}>
                                        <Typography variant="body1" align="left">
                                            Contact Number
                                        </Typography>
                                    </Paper>
                                    <Paper sx={{ p: 3, pr: 'auto', }} variant="outlined">
                                        <Typography variant="body1" align="left">
                                            {this.state?.userProfile?.contactNumber}
                                        </Typography>
                                    </Paper>
                                    <Paper sx={{ display: "flex", justifyContent: "right", gap: 5, py: 3, pr: 3, }} elevation={0}>
                                        <Button variant='contained' onClick={() => { }} size="medium">Edit</Button>
                                        <ConfirmationDialog
                                            title="Confirmation"
                                            description="Are you sure you want to proceed?"
                                            response={this.handleDeleteProfileClick}
                                        >
                                            {(showDialog) => (
                                                <Button variant='outlined' onClick={showDialog} color='error' size="medium">Delete</Button>
                                            )}
                                        </ConfirmationDialog>

                                    </Paper>
                                </Paper>
                            </Paper>
                            }
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
