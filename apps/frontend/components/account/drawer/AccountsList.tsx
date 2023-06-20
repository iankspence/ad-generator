import { Box, Grid, Typography, IconButton } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { useState, useEffect } from 'react';
import { findAdsByAccountId } from '../../../utils/api/mongo/ad/findAdsByAccountIdApi';

const AccountsList = ({ accounts }) => {
    const headers = ['Country', 'Province/State', 'City', 'ID', 'Company Name', 'Ads Paid Without Delivery', 'Fresh', 'PDF', 'Review', 'Approved', 'Delivered']; // Added 'Review'
    const [selectedSortIndex, setSelectedSortIndex] = useState(-1);
    const [sortDirection, setSortDirection] = useState('asc');
    const [accountAds, setAccountAds] = useState({}); // Will store each account's adStatus counts

    // Fetch and process ad data
    useEffect(() => {
        const fetchAndProcessAds = async () => {
            const newAccountAds = {};

            for (const account of accounts) {
                const ads = await findAdsByAccountId({ accountId: account._id });

                const adStatusCounts = { fresh: 0, pdf: 0, review: 0, approved: 0, delivered: 0 };
                for (const ad of ads) {
                    adStatusCounts[ad.adStatus]++;
                }

                newAccountAds[account._id] = adStatusCounts;
            }

            setAccountAds(newAccountAds);
        };

        fetchAndProcessAds();
    }, [accounts]);

    const sortAccounts = (index) => {
        let newIndex = index;
        if (index < 3) {
            newIndex = 0;  // Setting selectedSortIndex to 0 when Country, Province/State, or City is selected
        }

        setSortDirection((prevDirection) => {
            const newDirection = (newIndex === selectedSortIndex && prevDirection === 'asc') ? 'desc' : 'asc';

            setSelectedSortIndex(newIndex);

            const direction = newDirection === 'asc' ? 1 : -1;

            if (index < 3) { // For Country, Province/State, City sort
                accounts.sort((a, b) => {
                    const aKey = `${a.country}, ${a.provinceState}, ${a.city}`;
                    const bKey = `${b.country}, ${b.provinceState}, ${b.city}`;
                    return direction * aKey.localeCompare(bKey);
                });
            } else if (index === 4) { // For Company Name sort
                accounts.sort((a, b) => direction * a.companyName.localeCompare(b.companyName));
            } else if (index === 5) { // For Ads Paid Without Delivery sort
                accounts.sort((a, b) => direction * ((a.adsPaidWithoutDelivery || 0) - (b.adsPaidWithoutDelivery || 0)));
            } else { // For ad counts sort
                accounts.sort((a, b) => direction * ((accountAds[a._id][headers[index].toLowerCase()] || 0) - (accountAds[b._id][headers[index].toLowerCase()] || 0)));
            }

            return newDirection;
        });
    };

    return (
        <Box sx={{width: '100%'}}>
            <Grid container spacing={2}>
                {headers.map((header, headerIndex) => (
                    <Grid item xs={12} sm={(headerIndex === 3 || headerIndex === 4) ? 1.5 : 1} key={headerIndex}>
                        <IconButton onClick={() => sortAccounts(headerIndex)}>
                            {sortDirection === 'asc' && headerIndex === selectedSortIndex ?
                                <ArrowUpwardIcon style={{ color: 'orange' }} /> :
                                <ArrowDownwardIcon style={{ color: headerIndex === selectedSortIndex ? 'orange' : 'gray' }} />}
                        </IconButton>
                        <Typography variant="subtitle1" sx={{fontWeight: 'bold'}}>{header}</Typography>
                    </Grid>
                ))}
            </Grid>

            {accounts.map((account, index) => (
                <Box key={account._id} p={2} sx={{
                    backgroundColor: index % 2 === 0 ? '#F2F2F2' : 'white',
                    borderRadius: 2
                }}>
                    <Grid container spacing={2}>
                        {headers.map((header, headerIndex) => (
                            <Grid item xs={12} sm={(headerIndex === 3 || headerIndex === 4) ? 1.5 : 1} key={headerIndex}>
                                <Typography variant="caption">
                                    {headerIndex === 0 ? account.country :
                                        headerIndex === 1 ? account.provinceState :
                                            headerIndex === 2 ? account.city :
                                                headerIndex === 3 ? account._id :
                                                    headerIndex === 4 ? account.companyName :
                                                        headerIndex === 5 ? account.adsPaidWithoutDelivery || '0' :
                                                            accountAds[account._id] && accountAds[account._id][headers[headerIndex].toLowerCase()]}
                                </Typography>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            ))}
        </Box>
    );
};

export default AccountsList;
