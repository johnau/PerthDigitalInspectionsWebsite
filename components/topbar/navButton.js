import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';

// import { styled } from '@mui/material/styles';
import styled from '@emotion/styled';
import { Button, ListItem, Menu, MenuItem, MenuList, Typography } from '@mui/material';

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const NavButton = styled(Button)(({ theme }) => ({
    typography: {
        fontFamily: "InterLight, sans-serif",
    },
    color: theme.palette.primary.contrastText,
    ':hover': {
        backgroundColor: theme.palette.neutral[800]
    },

}));

const NavMenuItem = styled(MenuItem)(({ theme }) => ({
    typography: {
        fontFamily: "InterLight, sans-serif",
    },
    color: theme.palette.primary.contrastText,
    ':hover': {
        backgroundColor: theme.palette.neutral[800]
    },
    // margin: 10
}));

const StyledMenu = styled((props) => {
    const { type, ...rest } = props;
    if (type === 'desktop_menu') {
        return (
            <Menu
                elevation={0}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
                {...rest}
            />
        );
    } else if (type === 'mobile_menu') {
        return (
            <MenuList
                {...rest}
            />
        );
    } else {
        console.log("No type provided for menu");
        return (
            <></>
        );
    }
})(({ theme }) => ({
    marginTop: 10,
    '& .MuiPaper-root': {
        borderRadius: 3,
        backgroundColor: theme.palette.neutral[900],
        border: `5px solid ${theme.palette.neutral[700]}`,
        minWidth: 200,
        color: theme.palette.mode === 'light' ? theme.palette.primary.contrastText : theme.palette.primary.main,
        boxShadow:
            'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
        '& .MuiMenu-list': {
            padding: 10,
        },
    },
}));

export const NavLinkButton = (props) => {
    const { href, icon, title, size, showIcons, ...rest } = props;
    const router = useRouter();
    const active = href ? (router.pathname === href) : false;

    return (
        <ListItem
            disableGutters
            sx={{ display: 'flex', mb: 0.5, py: 0, px: 2 }}
            {...rest}>
            <NextLink href={href} passHref>
                <NavButton
                    variant={active ? "outlined" : "text"}
                    color={active ? "secondary" : "primary"}
                    >
                    {showIcons && icon} <Typography sx={{ ml: showIcons ? 2 : 0 }} fontSize={size}>{title}</Typography>
                </NavButton>
            </NextLink>
        </ListItem>
    );
};

export const NavActionButton = (props) => {
    const { icon, title, size, action, showIcons, ...rest } = props;

    return (
        <ListItem
            disableGutters
            sx={{ display: 'flex', mb: 0.5, py: 0, px: 2 }}
            {...rest}>
            <NavButton
                variant="text"
                color="primary"
                onClick={action ? action : null}>
                {icon} <Typography sx={{ ml: showIcons ? 2 : 0 }} fontSize={size}>{title}</Typography>
            </NavButton>
        </ListItem>
    );
};

// Create a MenuList for the mobile menu and have the services in line, no secondary popup.
// create as a separate component to avoid messing around? Or just take a prop and render differently in the StyledMenu component

export const NavMenuButton = (props) => {
    const { items, size, icon, showIcons, type = "desktop_menu", ...rest } = props;
    const router = useRouter();
    const [smAnchorEl, setSmAnchorEl] = useState(null);
    const smOpen = Boolean(smAnchorEl);
    const handleSmOpen = (event) => {
        setSmAnchorEl(event.currentTarget);
    };
    const handleSmClose = () => {
        setSmAnchorEl(null);
    };
    const _active = () => {
        for (let i = 0; i < items.length; i++) {
            if (items[i].href === router.pathname) {
                return true;
            }
        }
        return false;
    };
    const active = _active();

    return (
        <>
            <ListItem
                disableGutters
                sx={{ display: 'flex', mb: 0.5, py: 0, px: 2 }}
                {...rest}>
                <NavButton
                    variant={active ? "outlined" : "text"}
                    color={active ? "secondary" : "primary"}
                    id="services-button"
                    aria-controls={smOpen ? 'services-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={smOpen ? 'true' : undefined}
                    onClick={handleSmOpen}
                    endIcon={<KeyboardArrowDownIcon />}
                >
                    {showIcons && icon} <Typography sx={{ ml: showIcons ? 2 : 0 }} fontSize={size}>Services</Typography>
                </NavButton>
            </ListItem>
            <StyledMenu
                id="services-menu"
                anchorEl={smAnchorEl}
                open={smOpen}
                onClose={handleSmClose}
                type={type}
                MenuListProps={{
                    'aria-labelledby': 'services-button'
                }}>
                {items.map(i => {
                    const active = i.href ? (router.pathname === i.href) : false;
                    return (
                        <NextLink key={i.title} href={i.href} passHref>
                            <NavMenuItem onClick={handleSmClose} sx={{ width: '100%', textAlign: 'center'}}>
                                {showIcons && i.icon}
                                <Typography sx={{ width: '100%', ml: showIcons ? 2 : 0 }} fontSize={size} color={active ? "secondary" : "primary.contrastText"}>
                                    {i.title}
                                </Typography>
                            </NavMenuItem>
                        </NextLink>
                    );
                })}
            </StyledMenu>
        </>
    );
};