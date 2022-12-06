import NextLink from 'next/link';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { styled, alpha } from '@mui/material/styles';
import { AppBar, Avatar, Badge, Box, Button, Icon, IconButton, Menu, MenuItem, Stack, Toolbar, Tooltip, Typography } from '@mui/material';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Image from 'next/image';
import { MainMenu } from './topbar/mainMenu';
import { PopupMenu } from './topbar/popupMenu';

export let interFontTheme = createTheme({
    typography: {
        fontFamily: "InterLight, sans-serif",
    }
});

const NavButton = styled(Button)(({ theme }) => ({
    typography: {
        fontFamily: "InterLight, sans-serif",
    }
}));

const ApplicationTopBarRoot = styled(AppBar)(({ theme }) => ({
    backgroundColor: theme.palette.background.dark,
    boxShadow: theme.shadows[8]
}));

const InterTypography = styled(Typography)(({ theme }) => ({
    fontFamily: "InterSemiBold, sans-serif",
}));

const BoldLogoTypography = styled(Typography)(({ theme }) => ({
    fontFamily: "InterBold, sans-serif",
}));

const LogoImage = styled('img')(({ theme }) => ({
      iconRoot: {
        textAlign: 'center',
        transform: "rotate(180deg)",
      }
}));

const LogoIcon = styled(Icon)(({ theme }) => ({
    imageIcon: {
        height: '300px',
        width: '300px',
        transform: "rotate(180deg)",
    },
}));

const DesktopLogo = () => {
    return (
        <NextLink passHref href='/'>
        <Box sx={{ position: 'fixed', width: 250, left: 0, top: 0, zIndex: 0}}>
            <Box sx={{position: 'relative', width: 250, height: 120, pt: 2, backgroundColor: 'background.default'}}>
                <BoldLogoTypography sx={{position: 'absolute', left: 140, top: 13, color: '#000', fontSize: 52, zIndex: 10}} noWrap color='#000'>PDI</BoldLogoTypography>    
                <Image alt="Perth Digital Inspections" height='70' width='158' src="/static/images/logo.svg" position="absolute"/>
                <InterTypography sx={{position: 'absolute', left: 32, top: 80, fontSize: 13.1}} noWrap color='#000'>PERTH DIGITAL INSPECTIONS</InterTypography>
            </Box>
        </Box>
        </NextLink>
    );
};

const MobileLogo = () => {
    return (
        <NextLink passHref href='/'>
        <Box sx={{ position: 'fixed', width: 250, left: 0, right: 0, margin: 'auto', top: 0, zIndex: 0}}>
            <Box sx={{position: 'relative', width: 250, height: 120, pt: 2, backgroundColor: 'background.default'}}>
                <BoldLogoTypography sx={{position: 'absolute', left: 140, top: 13, color: '#000', fontSize: 52, zIndex: 10}} noWrap color='#000'>PDI</BoldLogoTypography>    
                <Image alt="Perth Digital Inspections" height='70' width='158' src="/static/images/logo.svg" position="absolute"/>
                <InterTypography sx={{position: 'absolute', left: 32, top: 80, fontSize: 13.1}} noWrap color='#000'>PERTH DIGITAL INSPECTIONS</InterTypography>
            </Box>
        </Box>
        </NextLink>
    );
};

export const ApplicationTopBar = ({mobileView, ...props}) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const handleMobileMenuOpen = (event) => {
        setMenuOpen(true);
        alert('menu open');
    };
    const handleMobileMenuClose = () => {
        setMenuOpen(false);

    };

    return (
        <Box {...props}>

            <ApplicationTopBarRoot
                sx={{
                    width: '100%',
                    height: 120
                }}
                {...props}>
                    
                <Toolbar
                    disableGutters
                    sx={{
                        height: 120,
                        px: 2,
                        justifyContent: 'center'
                    }}>
                    { mobileView && <PopupMenu><MainMenu type="contained" size={34} /></PopupMenu>}

                    <Box sx={{ flexGrow: 1 }} />
                        {/* {mobileView ? <MobileMenu /> : <DesktopMenu />} */}
                        {!mobileView && <MainMenu type="top" size={20} /> }
                    <Box sx={{ flexGrow: 1}} />
                
                </Toolbar>
                
                { mobileView ? MobileLogo() : DesktopLogo() }
                
            </ApplicationTopBarRoot>
            
        </Box>
    );
};

ApplicationTopBar.propTypes = {
    onSidebarOpen: PropTypes.func
};
