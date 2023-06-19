import { Button, Modal, Box } from '@mui/material';
import { AccountDocument } from "@monorepo/type";
import { useEffect, useState } from 'react';
import AccountsList from './AccountsList';
import AccountSelector from './AccountSelector';

const SelectAccount = ({ account, setAccount, accounts }) => {
    const [value, setValue] = useState<AccountDocument | null>(null);
    const [open, setOpen] = useState(false); // Modal open/close state

    useEffect(() => {
        if (accounts && account?._id) {
            const matchingAccount = accounts?.find(a => a._id === account?._id);
            setValue(matchingAccount || null);
        }
    }, [account, accounts]);

    if (!accounts) {
        return <div className="py-8"></div>;
    }

    accounts?.sort((a, b) => {
        const aKey = `${a.country}, ${a.provinceState}, ${a.city}`;
        const bKey = `${b.country}, ${b.provinceState}, ${b.city}`;
        return aKey.localeCompare(bKey);
    });

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div>
            <AccountSelector account={account} setAccount={setAccount} accounts={accounts} />

            <div className="py-2"></div>
            <Button onClick={handleOpen}>View Account List</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Box sx={{ width: '85%', height: '85%', overflow: 'auto' }}>
                    <AccountsList accounts={accounts} />
                    <Button onClick={handleClose} style={{ margin: '20px auto', display: 'block', color: 'white' }}>Close Account List</Button>
                </Box>
            </Modal>
        </div>
    );
}

export default SelectAccount;
