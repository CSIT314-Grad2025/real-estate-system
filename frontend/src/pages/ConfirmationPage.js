import { Box, Button, Container, CssBaseline, Typography } from "@mui/material";
import { Component } from "react";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { withRouter } from "../withRouter";
import AppHeader from "../components/AppHeader";

class ConfirmationPage extends Component {
    state;
    constructor(props) {
        super(props)
        this.state = {
            title: props.location?.state?.title || "Yay!",
            description: props.location?.state?.description || "Form submitted successfully",
            from: props.location?.state?.from?.pathname || "/",
            navigate: props.navigate,
        }
    }

    handleBack = (e) => {
        e.preventDefault();
        this.state.navigate(this.state.from, { replace: true });
    }

    render() {
        const { title, description } = this.state;

        return (
            <div>
                <CssBaseline />
                <AppHeader title="System Admin Home" />
                <Container maxWidth="sm" style={{ textAlign: 'center', marginTop: '50px' }}>
                    <CheckCircleIcon style={{ fontSize: 80, color: 'green' }} />
                    <Box mt={4}>
                        <Typography variant="h4" component="h1">
                            {title}
                        </Typography>
                        <Typography variant="body1" component="p" style={{ marginTop: '20px' }}>
                            {description}
                        </Typography>
                        <Button
                            variant="contained"
                            onClick={this.handleBack}
                            sx={{ mt: 3, mb: 2, mx: 'auto' }}
                        >
                            Go Back
                        </Button>
                    </Box>
                </Container>
            </div>
        );
    }
}

export default withRouter(ConfirmationPage);
