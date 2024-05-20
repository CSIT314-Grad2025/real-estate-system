import { Avatar, Box, Button, CardMedia, Container, CssBaseline, FormControl, FormControlLabel, FormLabel, Grid, InputAdornment, OutlinedInput, Paper, Radio, RadioGroup, TextField, Typography } from "@mui/material";
import { Component, useState } from "react";
import axios from "../api/axios";
import AppHeader from "../components/AppHeader";
import CardWithButton from "../material_components/CardWithButton";
import ConfirmationDialog from "../material_components/ConfirmationDialog";
import { styled } from '@mui/system';
import Footer from "../material_components/Footer";
import { withRouter } from "../withRouter";

class BuyerSearchMyListingsPage extends Component {

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
            soldListings: [],
            newListings: [],
            listings: [],
            savedListings: [],
            filteredListings: [],
            userProfile: null,
            new: "new",
        }
    }

    handleToggleNew = (e) => {
        this.setState({
            new: e.target.value
        })
        if (e.target.value === "new") {
            this.setState({
                listings: this.state.newListings,
            })
        } else {
            this.setState({
                listings: this.state.soldListings,
            })
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });

    };

    handleClickSave = async (id) => {
        try {
            const payload = {}
            const response = await axios.post(`/buyer/save/listing/${id}`, payload, {
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
                    description: "Property Listing Saved successfully.",
                    from: this.state.location
                }
            },);
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
    };

    handleCalculateMortgage = async (id, interestRate, loanTermYears, setMortgage) => {
        try {
            const payload = {
                interestRate,
                loanTermYears
            }
            const response = await axios.post(`/buyer/mortgage/calculate/${id}`, payload, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.state.auth.token}`
                },
                withCredentials: true
            }
            );
            console.log("API Response: ", response?.data);
            setMortgage(response?.data?.mortgage.toFixed(2));
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
    };


    componentDidMount() {
        // Fetch User Profile from server
        this.fetchUserProfile();
        this.fetchNewListings();
        this.fetchSoldListings();
        this.fetchSavedListings();
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

    fetchNewListings = async () => {
        try {
            const response = await axios.get(`/${this.state?.auth?.accountType}/search/listing/new`,
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
                newListings: response?.data?.newListings,
                listings: response.data?.newListins,
                filteredListings: response?.data?.newListings,
            })
        } catch (err) {
            console.log("ERROR: ", err);
        }
    }
    fetchSoldListings = async () => {
        console.log({ auth: this.state.auth })
        try {
            const response = await axios.get(`/${this.state?.auth?.accountType}/search/listing/sold`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.state.auth.token}`
                },
                withCredentials: true
            }
            );
            console.log("API Response: ", response?.data);
            this.setState({
                soldListings: response?.data?.soldListings,
            })
        } catch (err) {
            console.log("ERROR: ", err);
        }
    }

    fetchSavedListings = async () => {
        try {
            const response = await axios.get(`/buyer/view/my/listing`,
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
                savedListings: response?.data?.savedListings,
            })
        } catch (err) {
            console.log("ERROR: ", err);
        }
    }

    render() {
        let filteredListings;
        if (this.state.new === "new") {
            filteredListings = this.state?.newListings?.filter((listing, idx) =>
                listing?.title.toLowerCase().includes(this.state.searchTerm.toLowerCase()) ||
                listing?.location.toLowerCase().includes(this.state.searchTerm.toLowerCase())
            )
        } else {
            filteredListings = this.state?.soldListings?.filter((listing, idx) =>
                listing?.title.toLowerCase().includes(this.state.searchTerm.toLowerCase()) ||
                listing?.location.toLowerCase().includes(this.state.searchTerm.toLowerCase())
            )
        }

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
                    <AppHeader title="Marketplace" />
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
                            <FormControl>
                                <FormLabel id="demo-controlled-radio-buttons-group">Filter</FormLabel>
                                <RadioGroup
                                    row
                                    aria-labelledby="demo-controlled-radio-buttons-group"
                                    name="controlled-radio-buttons-group"
                                    value={this.state.new}
                                    onChange={this.handleToggleNew}
                                >
                                    <FormControlLabel value="new" control={<Radio />} label="New" />
                                    <FormControlLabel value="sold" control={<Radio />} label="Sold" />
                                </RadioGroup>
                            </FormControl>
                            {filteredListings?.map((listing, idx) => {
                                return (
                                    <PropertyCard key={listing.id}
                                        listing={listing}
                                        onClickSave={() => this.handleClickSave(listing.id)}
                                        onClickDelete={() => this.handleClickDelete(listing.id)}
                                        accountType={this.state.auth.accountType}
                                        handleCalculateMortgage={this.handleCalculateMortgage}
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
    const [calulateMortgage, setCalculateMortgage] = useState(false);
    const [loanTermYears, setloanTermYears] = useState(0);
    const [interestRate, setInterestRate] = useState(0.00);
    const [mortgage, setMortgage] = useState(0.00);

    return (
        <Box
            sx={{
                display: 'flex', justifyContent: 'left', flexDirection: 'column', pr: 'auto', columnGap: 2,
                mb: 4,
            }}
        >
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
                        <Paper elevation={0} sx={{ my: 2, mr: 10 }}>
                            <Typography variant="h5" align="center" sx={{ fontWeight: 900 }} gutterBottom>
                                ${props?.listing?.listPrice}
                            </Typography>
                        </Paper>
                    </Box>
                    {props.accountType === "buyer" && <Paper sx={{ display: "flex", justifyContent: "left", gap: 5, py: 1, pr: 1, }} elevation={0}>
                        <Button variant='contained' onClick={props.onClickSave} size="medium">Save</Button>
                        <Button variant='text' onClick={() => {
                            setCalculateMortgage(!calulateMortgage);
                        }} size="medium">Calculate Mortgage</Button>
                    </Paper>}
                </Paper>
            </Paper >
            {calulateMortgage && <Grid component="form" onSubmit={props.handleSubmit} container spacing={3}>
                {props.errorMessage && <Paper sx={{ ml: 2.75, p: 1.5, borderColor: 'red' }} variant='outlined'><Typography variant='subtitle2' color="red" >{props.errorMessage}</Typography></Paper>}
                <FormGrid item xs={6}>
                    <FormLabel required sx={{ textAlign: 'left' }}>
                        Mortgage Term (Years)
                    </FormLabel>
                    <OutlinedInput
                        id="loanTermYears"
                        name="loanTermYears"
                        value={loanTermYears}
                        onChange={(e) => {
                            setloanTermYears(e.target.value);
                        }}
                        type="number"
                        placeholder="Loan Term"
                        required
                    />
                </FormGrid>
                <FormGrid item xs={6}>
                    <FormLabel required sx={{ textAlign: 'left' }}>
                        Rate of Interest
                    </FormLabel>
                    <OutlinedInput
                        id="interestRate"
                        name="interestRate"
                        onChange={(e) => {
                            setInterestRate(e.target.value);
                        }}
                        value={interestRate}
                        type="number"
                        placeholder="Rate of Interest"
                        required
                    />
                </FormGrid>
                <FormGrid item xs={6}>
                    <FormLabel sx={{ textAlign: 'left', borderColor: 'blue' }}>
                        Est. Repayment
                    </FormLabel>
                    <OutlinedInput
                        sx={{ color: "blue", fontWeight: 900 }}
                        id="mortgage"
                        readOnly
                        name="mortgage"
                        endAdornment={<InputAdornment position="end">$ / month</InputAdornment>}
                        onChange={(e) => {
                            setMortgage(e.target.value);
                        }}
                        value={mortgage}
                        placeholder="0.00"
                        required
                    />
                </FormGrid>
                <Paper sx={{ display: "flex", justifyContent: "left", gap: 5, py: 1, pr: 1, }} elevation={0}>
                    <Button sx={{ m: 4 }} variant='contained' onClick={() => {
                        props.handleCalculateMortgage(props.listing.id, interestRate, loanTermYears, setMortgage)
                    }} size="medium">Calculate Mortgage</Button>
                </Paper>
            </Grid>}
        </Box>
    )
}
const FormGrid = styled(Grid)(() => ({
    display: 'flex',
    flexDirection: 'column',
}));

export default withRouter(BuyerSearchMyListingsPage);
