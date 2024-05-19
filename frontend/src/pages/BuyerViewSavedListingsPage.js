import { Avatar, Box, Button, CardMedia, Container, CssBaseline, Grid, Paper, TextField, Typography } from "@mui/material";
import { Component } from "react";
import axios from "../api/axios";
import AppHeader from "../components/AppHeader";
import CardWithButton from "../material_components/CardWithButton";
import ConfirmationDialog from "../material_components/ConfirmationDialog";
import Footer from "../material_components/Footer";
import { withRouter } from "../withRouter";

class BuyerViewSavedListingsPage extends Component {

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
            listings: [],
            filteredListings: [],
            userProfile: null,
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });

        this.setState({
            filteredListings: this.state.listings.filter((listing, idx) =>
                listing?.title.toLowerCase().includes(e.target.value.toLowerCase()) ||
                listing?.location.toLowerCase().includes(e.target.value.toLowerCase())
            )
        })
    };

    componentDidMount() {
        // Fetch User Profile from server
        this.fetchUserProfile();
        this.fetchMyListings();
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

    fetchMyListings = async () => {
        try {
            const response = await axios.get(`/${this.state?.auth?.accountType}/view/my/listing`,
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
                listings: response?.data?.listings,
                filteredListings: response?.data?.savedListings,
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
                    <Container maxWidth="lg" sx={{ marginY: 10 }}>
                        <main>
                            {this.state?.filteredListings?.map((listing, idx) => {
                                return (
                                    <PropertyCard key={listing.id}
                                        listing={listing}
                                        onClickEdit={() => this.handleClickEdit(listing.id)}
                                        onClickDelete={() => this.handleClickDelete(listing.id)}
                                        accountType={this.state?.auth?.accountType}
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

const PropertyCard = (props) => {
    return (
        <Paper elevation={0} sx={{
            display: 'flex', justifyContent: 'left', pr: 'auto', columnGap: 2,
            backgroundColor: 'grey.800',
            color: '#fff',
            mb: 4,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundImage: `url(https://loremflickr.com/800/600/bungalow?lock=${props.listing.id}&random=${props.listing.id})`,
        }}>
            <Paper variant="outlined" sx={{ p: 3, width: '65%', display: 'flex', flexDirection: 'column', justifyContent: 'left', pr: 'auto', columnGap: 10 }}>
                {!props.listing.isAvailable && <Paper variant="outlined" sx={{ width: "20%", borderColor: 'red' }}>
                    <Typography variant="button" align="left" color="red">
                        Sold
                    </Typography>
                </Paper>}
                {props.accountType === "seller" && <Paper variant="outlined" sx={{ width: "20%", borderColor: 'blue' }}>
                    <Typography variant="button" align="left" color="blue">
                        Views: {props?.listing?.views}
                    </Typography>
                </Paper>}
                <Box sx={{ my: 1 }}>
                    <Typography variant="h5" align="left" >
                        {props?.listing?.title}
                    </Typography>
                    <Typography variant="body1" align="left" gutterBottom>
                        {props?.listing?.description}
                    </Typography>
                </Box>
                <Box sx={{ my: 1 }}>
                    <Typography variant="subtitle1" align="left" >
                        Location
                    </Typography>
                    <Typography variant="h6" align="left" gutterBottom>
                        {props?.listing?.location}
                    </Typography>
                </Box>
                <Box sx={{ display: "flex", pr: 'auto' }}>
                    <Paper elevation={0} sx={{ my: 2, mr: 10 }}>
                        <Typography variant="button" align="left" gutterBottom>
                            Living Area
                        </Typography>
                        <Typography variant="h6" align="center" gutterBottom>
                            {props?.listing?.livingArea} SqFt.
                        </Typography>
                    </Paper>
                    <Paper elevation={0} sx={{ my: 2, mr: 10 }}>
                        <Typography variant="button" align="left" gutterBottom>
                            Bedrooms
                        </Typography>
                        <Typography variant="h6" align="center" gutterBottom>
                            {props?.listing?.bedrooms}
                        </Typography>
                    </Paper>
                    <Paper elevation={0} sx={{ my: 2, mr: 10 }}>
                        <Typography variant="button" align="left" gutterBottom>
                            Bathrooms
                        </Typography>
                        <Typography variant="h6" align="center" gutterBottom>
                            {props?.listing?.bathrooms}
                        </Typography>
                    </Paper>
                </Box>
                {props?.accountType === "realestateagent" && <Paper sx={{ display: "flex", justifyContent: "left", gap: 5, py: 1, pr: 1, }} elevation={0}>
                    <Button variant='contained' onClick={props.onClickEdit} size="medium">Edit</Button>
                    <ConfirmationDialog
                        title="Confirmation"
                        description="Are you sure you want to proceed?"
                        response={props.onClickDelete}
                    >
                        {(showDialog) => (
                            <Button variant='outlined' onClick={showDialog} color='error' size="medium">Delete</Button>
                        )}
                    </ConfirmationDialog>
                </Paper>}
            </Paper>
        </Paper >
    )
}

export default withRouter(BuyerViewSavedListingsPage);
