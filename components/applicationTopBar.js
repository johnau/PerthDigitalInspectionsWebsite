import NextLink from 'next/link';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { styled, alpha } from '@mui/material/styles';
import { AppBar, Avatar, Badge, Box, Button, Icon, IconButton, Menu, MenuItem, Stack, Toolbar, Tooltip, Typography } from '@mui/material';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Image from 'next/image';
import { MainMenu } from './topbar/mainMenu';
import { PopupMenu } from './topbar/popupMenu';
import { PortableWifiOffSharp } from '@mui/icons-material';

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
    boxShadow: theme.shadows[8],
    borderBottom: '1px solid ' + theme.palette.neutral[700]
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

const DesktopLogo = (props) => {
    return (
        <NextLink passHref href='/'>
            <Box sx={{
                position: 'absolute', 
                top: props.smallMenu ? -35 : -70, 
                left: props.smallMenu ? -30 : -40, 
                width: props.smallMenu ? 180 : 350,
                transition: 'top, left, width 0.3s ease'
                }}>
                <Image alt="Perth Digital Inspections" height='250' width='350' src="/static/images/logo_clean.svg"/>
            </Box>
        </NextLink>
    );
};

const MobileLogo = (props) => {
    return (
        <NextLink passHref href='/'>
            <Box sx={{
                position: 'absolute', 
                top: props.smallMenu ? -35 : -70, 
                left: 0, 
                right: 0, 
                margin: 'auto', 
                width: props.smallMenu ? 180 : 350,
                transition: 'top, left, width 0.3s ease'
                }}>
                <Image alt="Perth Digital Inspections" height='250' width='350' src="/static/images/logo_clean.svg"/>
            </Box>
        </NextLink>
    );
};

export const ApplicationTopBar = ({mobileView, ...props}) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [smallMenu, setSmallMenu] = useState(false);

    const topBarHeightSmall = 60;
    const topBarHeightLarge = 120;

    const handleMobileMenuOpen = (event) => {
        setMenuOpen(true);
        alert('menu open');
    };
    const handleMobileMenuClose = () => {
        setMenuOpen(false);

    };

    useEffect(() => {
      window.onscroll = () => {
        if (window.pageYOffset == 0) {
            setSmallMenu(false);
            return;
        }
        if (window.pageYOffset > 50) {
            setSmallMenu(true);
        } else {
            setSmallMenu(false);
        }
      };
    }, []);

    return (
        <Box {...props}>

            <ApplicationTopBarRoot
                sx={{
                    width: '100%',
                    height: smallMenu ? topBarHeightSmall : topBarHeightLarge,
                    transition: "height 0.3s ease",
                }}
                {...props}>
                    
                <Toolbar
                    disableGutters
                    sx={{
                        height: smallMenu ? topBarHeightSmall : topBarHeightLarge,
                        transition: "height 0.3s ease",
                        px: 2,
                        justifyContent: 'center'
                    }}>

                    <Box sx={{ flexGrow: 1 }} />
                        {/* {mobileView ? <MobileMenu /> : <DesktopMenu />} */}
                        {!mobileView && <MainMenu type="top" size={20} showIcons={false} /> }
                    <Box sx={{ flexGrow: 1}} />

                    { mobileView && <PopupMenu><MainMenu type="contained" size={34} showIcons={true} /></PopupMenu>}

                </Toolbar>
                
                { mobileView ? <MobileLogo smallMenu={smallMenu} /> : <DesktopLogo smallMenu={smallMenu} /> }
                
            </ApplicationTopBarRoot>
            
        </Box>
    );
};

ApplicationTopBar.propTypes = {
    onSidebarOpen: PropTypes.func
};
