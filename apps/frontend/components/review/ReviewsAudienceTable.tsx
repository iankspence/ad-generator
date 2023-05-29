import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import ReviewViewer from './ReviewViewer';

const ReviewsAudienceTable = ({ audienceData }) => {
    return (
        <>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            {[
                                'Audience Name',
                                'Google',
                                'RateMDs',
                                'Total',
                                'Age Range',
                                'Interests',
                            ].map((header, index) => (
                                <TableCell key={index}>
                                    {header}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {audienceData.map((row, index) => (
                            <TableRow key={index}>
                                <TableCell component="th" scope="row">
                                    {row.name}
                                </TableCell>

                                {['googleReviews', 'rateMDsReviews', 'totalReviews', 'age'].map((field, fieldIndex) => (
                                    <TableCell key={fieldIndex}>
                                        {row[field]}
                                    </TableCell>
                                ))}
                                <TableCell>
                                    {row.interests}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <ReviewViewer />
        </>
    );
};

export default ReviewsAudienceTable;
