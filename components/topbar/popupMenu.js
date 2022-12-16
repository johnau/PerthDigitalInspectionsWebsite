import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { AppBar, Avatar, Badge, Box, Button, Divider, Icon, IconButton, Menu, MenuItem, Modal, Stack, Toolbar, Tooltip, Typography } from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import { NavActionButton } from './navButton';
import CloseIcon from '@mui/icons-material/Close';

const MenuBurgerButton = styled(IconButton)(({ theme }) => ({
    color: theme.palette.primary.contrastText
}));

export const PopupMenu = (props) => {
    const { children } = props;
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const router = useRouter();

    useEffect(() => {
        handleClose();
    }, [router.asPath]);

    return (
        <>
            <MenuBurgerButton onClick={handleOpen}>
                <MenuIcon sx={{ width: 40, height: 40, mt: -0.5 }} />
            </MenuBurgerButton>
            <Modal
                open={open}
                onClose={handleClose}
                sx={{ display: 'flex', width: '100%', justifyContent: 'center', top: 16 }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', width: 500, height: 700, justifyContent: 'center' }}>
                    <NavActionButton
                        title="Close menu"
                        action={handleClose}
                        icon={<CloseIcon />}
                        sx={{
                            backgroundColor: 'background.dark',
                            pb: 10,
                            alignContent: 'center',
                            alignItems: 'center',
                            justifyContent: 'center',
                            justifyItems: 'center'
                        }}
                    />

                    {children}

                    <Box sx={{ backgroundColor: 'background.dark', height: 100 }} />
                </Box>
            </Modal>
        </>
    );
};

