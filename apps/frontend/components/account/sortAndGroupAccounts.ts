export const sortAndGroupAccounts = (accounts) => {
    // First, sort the accounts alphabetically by country, provinceState, and city
    const sortedAccounts = accounts.sort((a, b) => {
        const locationA = `${a.country}-${a.provinceState}-${a.city}`.toLowerCase();
        const locationB = `${b.country}-${b.provinceState}-${b.city}`.toLowerCase();
        if (locationA < locationB) return -1;
        if (locationA > locationB) return 1;
        return 0;
    });

    // Then, group the accounts by country, provinceState, and city
    const groupedAccounts = sortedAccounts.reduce((groups, account) => {
        const location = `${account.country}-${account.provinceState}-${account.city}`;
        if (!groups[location]) {
            groups[location] = [];
        }
        groups[location].push(account);
        return groups;
    }, {});

    return groupedAccounts;
};
