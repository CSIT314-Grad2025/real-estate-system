import { Card, CardContent, CardActions, Button, Typography, Paper } from '@mui/material';

const CardWithButton = (props) => {
    const { title, description, buttonLabel, onClick } = props
    return (
        <Paper elevation={0} sx={{ maxWidth: 345, mt: 5, pb: 3 }}>
            <CardContent>
                <Typography align='left' variant="h5" component="div" gutterBottom>
                    {title}
                </Typography>
                <Typography align='left' variant="body2" color="text.secondary">
                    {description}
                </Typography>
            </CardContent>
            <CardActions sx={{ display: "flex", justifyContent: "left", pl: 2 }}>
                <Button variant='contained' onClick={onClick} size="medium">{buttonLabel}</Button>
            </CardActions>
        </Paper>
    );
};

export default CardWithButton;
