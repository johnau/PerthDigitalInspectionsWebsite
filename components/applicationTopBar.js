import NextLink from 'next/link';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
// import { styled, alpha } from '@mui/material/styles';
import styled from '@emotion/styled';
import { AppBar, Avatar, Badge, Box, Button, Icon, IconButton, Menu, MenuItem, Stack, Toolbar, Tooltip, Typography } from '@mui/material';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Image from 'next/image';
import { MainMenu } from './topbar/mainMenu';
import { PopupMenu } from './topbar/popupMenu';
import { PortableWifiOffSharp } from '@mui/icons-material';
import { useDebouncedEffect } from '../utility/useDebouncedEffect';
import logoClean from '../public/static/images/logo_clean.svg';
import Properties from '../properties';

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
    borderBottom: '1px solid ' + theme.palette.neutral[800]
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
                transition: 'width 0.3s ease, top 0.3s ease, left 0.3s ease',
                height: props.smallMenu ? 100 : 200,
                overflow: 'hidden',
                cursor: 'pointer'
            }}>
                <Box>
                    <Image alt="Perth Digital Inspections" height="250" width="350" src={logoClean} />
                </Box>
            </Box>
        </NextLink>
    );
};

const MobileLogoAnimationBox = styled.div(
    props => ({
        position: 'absolute',
        margin: 'auto',
        left: props.left,
        top: props.top,
        transition: props.scrollDir == 'up' ? 
            'left 0.5s ease, top 0.5s ease, right 0.5s ease' 
            : 
            'left 0.3s ease 0.3s, top 0.3s ease 0.3s, right 0.3s ease 0.3s',
        cursor: 'pointer',
        '& img': {
            width: props.width,
            height: props.height
        }
    }),
);

const MobileLogo = (props) => {
    const { smallMenu, ...rest } = props;
    const [logoInBar, setLogoInBar] = useState(false);
    const [resizeState, setResizeState] = useState({
        mobileView: false,
    });
    const [top, setTop] = useState(120);
    const [bottom, setBottom] = useState(-120);
    const [left, setLeft] = useState(0);
    const [right, setRight] = useState(0);
    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);
    const [scrollDir, setScrollDir] = useState('up'); // used to change animation direction

    useEffect(() => {
        const procResizeState = () => {
            return window.innerWidth < Properties.mobileViewLimit
                ? setResizeState((prevState) => ({ ...prevState, mobileView: true }))
                : setResizeState((prevState) => ({ ...prevState, mobileView: false }));
        };
        procResizeState();
        window.addEventListener("resize", () => procResizeState());
        return () => window.removeEventListener("resize", () => procResizeState());
    }, []);

    useDebouncedEffect(() => {
        const onScroll = () => {
            if (window.pageYOffset == 0) {
                setLogoInBar(false);
                return;
            }
            if (window.pageYOffset > 150) {
                setLogoInBar(true);
            } else {
                setLogoInBar(false);
            }
        };

        document.addEventListener('scroll', () => onScroll(), true);
        return () => document.removeEventListener('scroll', () => onScroll(), true);
    }, [], 100);

    useEffect(() => {
        if (!logoInBar && !resizeState.mobileView) { // logo on page
            setScrollDir('up');
            setLeft(600);
            setRight(-600);
            setTop(120); // was 40
            setBottom(0);
            setWidth(350);
            setHeight(200);
            console.log("Bar logo should not be visible");
        } else if (!logoInBar && resizeState.mobileView) {
            setScrollDir('up');
            setLeft(0);
            setRight(0);
            setTop(120);
            setBottom(-120);
            setWidth(180);
            setHeight(100);
            console.log("Bar logo should not be visible");
        } else if (logoInBar && !resizeState.mobileView) { // logo on left
            setScrollDir('down');
            setLeft(0);
            setRight(0);
            setTop(-22);
            setBottom(0);
            setWidth(180);
            setHeight(100);
            console.log("Bar logo should be visible on left");
        } else if (logoInBar && resizeState.mobileView) { // logo in middle
            setScrollDir('down');
            setLeft(0);
            setRight(0);
            setTop(-22);
            setBottom(0);
            setWidth(180);
            setHeight(100);
            console.log("Bar logo should be visible in middle");
        }
    }, [logoInBar, resizeState]);

    return (
        <Box sx={{
            position: 'absolute',
            left: 0,
            right: 0,
            margin: resizeState.mobileView ? 'auto' : 0,
            overflow: 'hidden',
            width: smallMenu ? 180 : 600,
            height: smallMenu ? 60 : 120,
            // backgroundColor: "#23DD45"
        }}>
            <NextLink passHref href='/'>
                <MobileLogoAnimationBox
                    position='relative'
                    margin='auto'
                    top={top}
                    left={left}
                    right={right}
                    width={width}
                    height={height}
                    zIndex='99'
                    scrollDir={scrollDir}
                >
                    <Image alt="Perth Digital Inspections" width="350" height="200" src={logoClean} />
                </MobileLogoAnimationBox>
            </NextLink>
        </Box>
    );
};

export const ApplicationTopBar = ({ mobileView, ...props }) => {
    // const [menuOpen, setMenuOpen] = useState(false);
    const [smallMenu, setSmallMenu] = useState(false);

    const topBarHeightSmall = 60;
    const topBarHeightLarge = 120;

    // const handleMobileMenuOpen = (event) => {
    //     setMenuOpen(true);
    //     alert('menu open');
    // };
    // const handleMobileMenuClose = () => {
    //     setMenuOpen(false);

    // };

    useDebouncedEffect(() => {
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
    }, [], 100);

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
                    {!mobileView && <MainMenu type="top" size={20} showIcons={false} />}
                    <Box sx={{ flexGrow: 1 }} />

                    {mobileView && <PopupMenu><MainMenu type="contained" size={34} showIcons={true} /></PopupMenu>}

                </Toolbar>

                {/* {mobileView ? <MobileLogo smallMenu={smallMenu} /> : <DesktopLogo smallMenu={smallMenu} />} */}
                <MobileLogo smallMenu={smallMenu} />

            </ApplicationTopBarRoot>

        </Box>
    );
};

ApplicationTopBar.propTypes = {
    onSidebarOpen: PropTypes.func
};
