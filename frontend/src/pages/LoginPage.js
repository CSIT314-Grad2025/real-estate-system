import { Component } from "react";
import axios from "../api/axios";
import { withRouter } from "../withRouter";

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Navigate } from "react-router-dom";

class LoginPage extends Component {

    state;
    defaultTheme;

    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            accountType: '',
            errorMessage: '',
            auth: props.auth,
            isLoggedIn: false,
            setAuth: props.auth.setAuth,
            navigate: props.navigate,
            location: props.location,
            from: props.location.state?.from?.pathname
        }
        this.defaultTheme = createTheme();
    }

    componentDidMount = () => {
        if (window.sessionStorage.getItem("accountType") && window.sessionStorage.getItem("token")) {
            this.state.setAuth({
                accountType: window.sessionStorage.getItem("accountType"),
                token: window.sessionStorage.getItem("token"),
            })
            this.setState({ isLoggedIn: true })
        }
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
            const response = await axios.post(`/${accountType}/login`,
                JSON.stringify({ email, password, accountType }), {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            }
            );
            console.log("API Response: ", response?.data);
            this.state.setAuth({
                accountType: response?.data?.accountType,
                token: response?.data?.token,
            })
            window.sessionStorage.setItem("accountType", response?.data?.accountType)
            window.sessionStorage.setItem("token", response?.data?.token)

            if (!this.state.from) {
                this.state.navigate(`/${window.sessionStorage.getItem("accountType")}/home`, { replace: true })
            } else {
                this.state.navigate(this.state.from, { replace: true });
            }

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
        const { email, password, accountType } = this.state;
        return (
            <ThemeProvider theme={this.defaultTheme}>
                {this.state.isLoggedIn && <Navigate to={`/${window.sessionStorage.getItem("accountType")}/home`} />}
                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <Box
                        sx={{
                            marginTop: 8,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign in
                        </Typography>
                        <Box component="form" onSubmit={this.handleSubmit} noValidate sx={{ mt: 1 }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                value={this.state.email}
                                onChange={this.handleChange}
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                autoFocus
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                value={this.state.password}
                                onChange={this.handleChange}
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                            />
                            <FormControl fullWidth >
                                <InputLabel >Account Type</InputLabel>
                                <Select
                                    name="accountType"
                                    value={accountType}
                                    label="Account Type"
                                    onChange={this.handleChange}
                                >
                                    <MenuItem value="rea">Real Estate Agent</MenuItem>
                                    <MenuItem value="buyer">Buyer</MenuItem>
                                    <MenuItem value="seller">Seller</MenuItem>
                                    <MenuItem value="systemadmin">System Administrator</MenuItem>
                                </Select>
                            </FormControl>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Sign In
                            </Button>
                        </Box>
                    </Box>
                    <Copyright sx={{ mt: 8, mb: 4 }} />
                </Container>
            </ThemeProvider>
        );
    }
}
const Copyright = (props) => {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            Grad2025 Group - Real Estate System
            {'.'}
        </Typography>
    );
}

export default withRouter(LoginPage);
