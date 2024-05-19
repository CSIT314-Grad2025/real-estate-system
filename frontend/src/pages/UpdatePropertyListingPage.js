import { Box, Button, Container, CssBaseline, Grid, InputAdornment, Paper, Typography } from '@mui/material'; import React, { Component } from 'react';
import Footer from '../material_components/Footer';
import { withRouter } from '../withRouter';
import axios from '../api/axios';
import FormLabel from '@mui/material/FormLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import { styled } from '@mui/system';
import AppHeader from '../components/AppHeader';

class UpdatePropertyListingPage extends Component {
    state;

    constructor(props) {
        super(props);
        this.state = {
            auth: props.auth.auth,
            setAuth: props.auth.setAuth,
            params: props.params,
            navigate: props.navigate,
            location: props.location,
            errorMessage: "",
            title: '',
            description: '',
            propertyType: '',
            livingArea: '',
            bedrooms: '',
            locationInput: '',
            bathrooms: '',
            listPrice: '',
        }
    }

    async componentDidMount() {
        // Fetch listing details to autofill the form
        this.fetchListing();
    }

    fetchListing = async () => {
        try {
            const response = await axios.get(`/common/view/listing/${this.state?.params?.id}`,
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
                title: response.data?.listing?.title,
                description: response.data?.listing?.description,
                propertyType: response.data?.listing?.propertyType,
                livingArea: response.data?.listing?.livingArea,
                bedrooms: response.data?.listing?.bedrooms,
                locationInput: response.data?.listing?.location,
                bathrooms: response.data?.listing?.bathrooms,
                listPrice: response.data?.listing?.listPrice,
            })
        } catch (err) {
            console.log("ERROR: ", err);
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };


    handleSubmit = async (e) => {
        e.preventDefault();
        const {
            title,
            description,
            propertyType,
            livingArea,
            bedrooms,
            locationInput,
            bathrooms,
            listPrice,
        } = this.state;

        try {
            const payload = {
                title,
                description,
                propertyType,
                livingArea,
                bedrooms,
                location: locationInput,
                bathrooms,
                listPrice,
            }
            const response = await axios.put(`/realestateagent/update/listing/${this.state?.params?.id}`, payload, {
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
                    description: "Property Listing updated successfully.",
                    from: {
                        pathname: this.state?.location?.state?.from?.pathname
                    }
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
                    <AppHeader title="Update Property Listing" />
                    <Container maxWidth="sm" sx={{ marginY: 10 }}>
                        <Grid component="form" onSubmit={this.handleSubmit} container spacing={3}>
                            {this.state.errorMessage && <Paper sx={{ ml: 2.75, p: 1.5, borderColor: 'red' }} variant='outlined'><Typography variant='subtitle2' color="red" >{this.state.errorMessage}</Typography></Paper>}
                            <FormGrid item xs={12}>
                                <FormLabel required sx={{ textAlign: 'left' }}>
                                    Title
                                </FormLabel>
                                <OutlinedInput
                                    id="title"
                                    name="title"
                                    value={this.state.title}
                                    onChange={this.handleChange}
                                    placeholder="Title"
                                    required
                                />
                            </FormGrid>
                            <FormGrid item xs={12}>
                                <FormLabel required sx={{ textAlign: 'left' }}>
                                    Description
                                </FormLabel>
                                <OutlinedInput
                                    id="description"
                                    name="description"
                                    value={this.state.description}
                                    onChange={this.handleChange}
                                    placeholder="Description"
                                    required
                                />
                            </FormGrid>
                            <FormGrid item xs={6}>
                                <FormLabel required sx={{ textAlign: 'left' }}>
                                    PropertyType
                                </FormLabel>
                                <OutlinedInput
                                    id="propertyType"
                                    name="propertyType"
                                    value={this.state.propertyType}
                                    onChange={this.handleChange}
                                    placeholder="Property Type"
                                    required
                                />
                            </FormGrid>
                            <FormGrid item xs={6}>
                                <FormLabel required sx={{ textAlign: 'left' }}>
                                    Living Area (SqFt.)
                                </FormLabel>
                                <OutlinedInput
                                    id="livingArea"
                                    name="livingArea"
                                    value={this.state.livingArea}
                                    onChange={this.handleChange}
                                    placeholder="Area"
                                    required
                                />
                            </FormGrid>
                            <FormGrid item xs={6}>
                                <FormLabel required sx={{ textAlign: 'left' }}>
                                    Bedrooms
                                </FormLabel>
                                <OutlinedInput
                                    id="bedrooms"
                                    name="bedrooms"
                                    type="number"
                                    onChange={this.handleChange}
                                    value={this.state.bedrooms}
                                    placeholder="Bedrooms"
                                    required
                                />
                            </FormGrid>
                            <FormGrid item xs={6}>
                                <FormLabel required sx={{ textAlign: 'left' }}>
                                    Bathrooms
                                </FormLabel>
                                <OutlinedInput
                                    id="bathrooms"
                                    name="bathrooms"
                                    type="number"
                                    onChange={this.handleChange}
                                    value={this.state.bathrooms}
                                    placeholder="Bathrooms"
                                    required
                                />
                            </FormGrid>
                            <FormGrid item xs={12}>
                                <FormLabel required sx={{ textAlign: 'left' }}>
                                    Location
                                </FormLabel>
                                <OutlinedInput
                                    id="locationInput"
                                    name="locationInput"
                                    onChange={this.handleChange}
                                    value={this.state.locationInput}
                                    placeholder="Location"
                                    required
                                />
                            </FormGrid>
                            <FormGrid item xs={12}>
                                <FormLabel required sx={{ textAlign: 'left' }}>
                                    List Price
                                </FormLabel>
                                <OutlinedInput
                                    id="listPrice"
                                    startAdornment={<InputAdornment position='start'>$</InputAdornment>}
                                    type='number'
                                    name="listPrice"
                                    onChange={this.handleChange}
                                    value={this.state.listPrice}
                                    placeholder="List Price"
                                    required
                                />
                            </FormGrid>
                            <Button
                                type="submit"
                                variant="contained"
                                sx={{ mt: 3, mb: 2, mx: 'auto' }}
                            >
                                Update Listing
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

export default withRouter(UpdatePropertyListingPage);
