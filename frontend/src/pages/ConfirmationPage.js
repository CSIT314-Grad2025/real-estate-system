import { Box, Container, Typography } from "@mui/material";
import { Component } from "react";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { withRouter } from "../withRouter";

class ConfirmationPage extends Component {
    state;
    constructor(props) {
        super(props)
        this.state = {
            title: props.location?.state?.title || "Yay!",
            description: props.location?.state?.description || "Form submitted successfully",
        }
    }

    render() {
        const { title, description } = this.state;

        return (
            <Container maxWidth="sm" style={{ textAlign: 'center', marginTop: '50px' }}>
                <CheckCircleIcon style={{ fontSize: 80, color: 'green' }} />
                <Box mt={4}>
                    <Typography variant="h4" component="h1">
                        {title}
                    </Typography>
                    <Typography variant="body1" component="p" style={{ marginTop: '20px' }}>
                        {description}
                    </Typography>
                </Box>
            </Container>
        );
    }
}

export default withRouter(ConfirmationPage);
