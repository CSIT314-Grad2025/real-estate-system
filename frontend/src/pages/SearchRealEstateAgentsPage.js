import { Avatar, Box, Button, CardMedia, Container, CssBaseline, Grid, Paper, TextField, Typography } from "@mui/material";
import { Component } from "react";
import axios from "../api/axios";
import AppHeader from "../components/AppHeader";
import CardWithButton from "../material_components/CardWithButton";
import ConfirmationDialog from "../material_components/ConfirmationDialog";
import Footer from "../material_components/Footer";
import { withRouter } from "../withRouter";

class SearchRealEstateAgentsPage extends Component {

    state;

    constructor(props) {
        super(props)
        this.state = {
            email: '',
            params: props.params,
            auth: props.auth?.auth,
            setAuth: props.auth.setAuth,
            navigate: props.navigate,
            location: props.location,
            errorMessage: '',
            searchTerm: '',
            profiles: [],
            filteredProfiles: [],
            userProfile: null,
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });

        console.log(this.state)
        this.setState({
            filteredProfiles: this.state.profiles.filter((profile, idx) =>
                profile?.firstName.toLowerCase().includes(e.target.value.toLowerCase()) ||
                profile?.lastName.toLowerCase().includes(e.target.value.toLowerCase())
            )
        })
    };

    componentDidMount() {
        // Fetch User Profile from server
        this.fetchUserProfile();
        this.fetchRealEstateAgents();
    }

    fetchUserProfile = async () => {
        try {
            const response = await axios.get(`/common/view/myprofile`,
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

    fetchRealEstateAgents = async () => {
        try {
            const response = await axios.get(`/common/search/realestateagent`,
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
                profiles: response?.data?.realEstateAgentProfiles,
                filteredProfiles: response?.data?.realEstateAgentProfiles,
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
                    <AppHeader title="My Listings" />
                    <TextField sx={{ marginY: 3, maxWidth: '50%', mx: 'auto', }}
                        value={this.state.searchTerm}
                        autoFocus
                        onChange={this.handleChange}
                        fullWidth
                        name="searchTerm"
                        label="Search"
                    />
                    <Container maxWidth="md" sx={{ marginY: 10 }}>
                        <main>
                            {this.state.filteredProfiles.map((profile, idx) => {
                                return (
                                    <ProfileCard key={profile.id}
                                        profile={profile}
                                        onClickEdit={() => this.handleClickEdit(profile.id)}
                                        onClickDelete={() => this.handleClickDelete(profile.id)}
                                        accountType={this.state.auth.accountType}
                                    />
                                )
                            })}
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

const ProfileCard = (props) => {
    return (
        <Paper variant="outlined" sx={{ mb: 2, py: 0, px: 8, width: '100%', display: 'flex', justifyContent: 'left', alignItems: 'center', pr: 'auto', columnGap: 10 }}>
            <Avatar
                alt={props.profile?.firstName}
                src={props.profile?.avatar}
                sx={{ width: 75, height: 75 }}
            />
            <Box sx={{ p: 3, pr: 'auto', }} >
                <Typography variant="h6" align="left">
                    {props.profile?.firstName} {props.profile?.lastName}
                </Typography>
                <Typography variant="body1" align="left">
                    {props.profile?.bio}
                </Typography>
            </Box>
            <Paper sx={{ ml: 'auto', mr: 3, display: "flex", justifyContent: "left", gap: 5, py: 1, pr: 1, }} elevation={0}>
                <Button variant='contained' onClick={props.onClickEdit} size="medium">View</Button>
            </Paper>
        </Paper >
    )
}

export default withRouter(SearchRealEstateAgentsPage);
