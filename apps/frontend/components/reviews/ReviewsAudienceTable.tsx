import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Hidden from '@mui/material/Hidden';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ReviewViewer from './ReviewViewer';

const ReviewsAudienceTable = ({ audienceData }) => {
    const headers = ['Audience Name', 'Google', 'RateMDs', 'Total', 'Age Range', 'Interests'];

    return (
        <div className="p-2">
            <Box sx={{width: '100%'}}>
                {audienceData.map((row, rowIndex) => (
                    <Box key={rowIndex} p={2} sx={{
                        backgroundColor: rowIndex % 2 === 0 ? '#F2F2F2' : 'white',
                        borderRadius: 2 // change this value to adjust the rounding
                    }}>
                        <Grid container spacing={2}>
                            {headers.map((header, headerIndex) => (
                                <Grid item xs={12} sm={2} key={headerIndex}>
                                    <Hidden xsDown>
                                        <Typography variant="subtitle1" sx={{fontWeight: 'bold'}}>{header}</Typography>
                                    </Hidden>
                                    <Typography variant="caption">
                                        {headerIndex === 0 ? row.name || '0' :
                                            headerIndex < 4 ? (row[headers[headerIndex].toLowerCase() + 'Reviews'] || '0') :
                                                headerIndex === 4 ? (row.age || '0') :
                                                    (row.interests || '0')}
                                    </Typography>
                                </Grid>
                            ))}
                        </Grid>
                    </Box>
                ))}
            </Box>
            <ReviewViewer />
        </div>
    );
};

export default ReviewsAudienceTable;
