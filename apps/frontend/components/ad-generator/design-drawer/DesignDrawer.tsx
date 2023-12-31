import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import TextureOutlinedIcon from '@mui/icons-material/TextureOutlined';
import ImageAccordion from './image/accordion/ImageAccordion';
import TextInputAccordion from './text-input/accordion/TextInputAccordion';
import MasterTextStyleAccordion from './text-style/accordion/MasterTextStyleAccordion';
import MaskAccordion from './mask/accordion/MaskAccordion';

const DesignDrawer = ({ rightDrawerOpen, setRightDrawerOpen }) => {

    const handleDrawerOpen = () => {
        setRightDrawerOpen(true);
    };

    const handleDrawerClose = () => {
        setRightDrawerOpen(false);
    };

    return (
        <Box>
            <div className="fixed top-8 right-8 z-10 bg-white hover:bg-gray-300 text-black rounded-full">
                <IconButton
                    onClick={handleDrawerOpen}
                    style={{ zIndex: 20, color: 'black' }}
                    className=""
                >
                    <TextureOutlinedIcon />
                </IconButton>
            </div>
            <Drawer
                anchor="right"
                open={rightDrawerOpen}
                onClose={handleDrawerClose}
                PaperProps={{
                    sx: {
                        width: '400px',
                        padding: 2,
                    },
                }}
                componentsProps={{
                    backdrop: {
                        sx: {
                            backgroundColor: 'transparent',
                        },
                    },
                }}
            >
                <Box>
                    <Typography variant="h6" gutterBottom>
                        Design Elements
                    </Typography>

                    <ImageAccordion />
                    <MaskAccordion />
                    <TextInputAccordion />
                    <MasterTextStyleAccordion />
                </Box>
            </Drawer>
        </Box>
    );
};

export default DesignDrawer;
