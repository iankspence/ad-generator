import { Card, CardContent, Typography, CardActions, Button, List, ListItem, ListItemText } from '@mui/material';

export function PricingCard({ price, buttonText, onClick }) {
    const reviewDrumMedGray = '#9E9E9E';
    const reviewDrumDarkGray = '#1E1E1E';

    return (
        <Card elevation={3} className="flex flex-col h-full">
            <CardContent className="flex flex-col flex-grow">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="h5" component="div" gutterBottom className="mb-2">
                        {price.tier}
                    </Typography>
                    <Typography variant="body1" component="p" className="font-bold mb-2">
                        {price.oneTimePrice}
                    </Typography>
                </div>
                <Typography variant="body2" component="p" gutterBottom className="mb-2">
                    {price.description}
                </Typography>
                <List className="flex-grow">
                    {price.bullets.map((bullet, idx) => (
                        <ListItem key={idx}>
                            <ListItemText primary={`\u2022 ${bullet}`} />
                        </ListItem>
                    ))}
                </List>
            </CardContent>
            <CardActions className="mb-2" style={{ justifyContent: 'center' }}>
                <Button
                    size="large"
                    fullWidth
                    variant="contained"
                    onClick={onClick}
                    sx={{
                        backgroundColor: reviewDrumMedGray,
                        color: 'white',
                        '&:hover': {
                            backgroundColor: reviewDrumDarkGray,
                            color: 'white',
                        },
                    }}
                >
                    {buttonText}
                </Button>
            </CardActions>
        </Card>
    );
}
