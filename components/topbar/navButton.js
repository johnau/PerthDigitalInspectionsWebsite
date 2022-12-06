import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';

import { styled } from '@mui/material/styles';
import { Button, ListItem, Menu, MenuItem, Typography } from '@mui/material';

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const NavButton = styled(Button)(({ theme }) => ({
    typography: {
        fontFamily: "InterLight, sans-serif",
    },
    color: theme.palette.primary.contrastText
}));
const NavMenuItem = styled(MenuItem)(({ theme }) => ({
    typography: {
        fontFamily: "InterLight, sans-serif",
    },
    color: theme.palette.primary.contrastText,
    ':hover': {
        backgroundColor: theme.palette.neutral[600]
    },
    margin: 10
}));

const StyledMenu = styled((props) => (
    <Menu
      elevation={0}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
      {...props}
    />
))(({ theme }) => ({
    '& .MuiPaper-root': {
        borderRadius: 6,
        backgroundColor: theme.palette.neutral[800],
        minWidth: 200,
        color: theme.palette.mode === 'light' ? theme.palette.primary.contrastText : theme.palette.primary.main,
        boxShadow:
        'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
        '& .MuiMenu-list': {
            padding: '10px 10px',
        },
    },
}));


export const NavLinkButton = (props) => {
    const { href, icon, title, size, ...rest } = props;
    const router = useRouter();
    const active = href ? (router.pathname === href) : false;
  
    return (
    <ListItem
        disableGutters 
        sx={{display: 'flex', mb: 0.5, py: 0, px: 2}}
        {...rest}>
        <NextLink href={href} passHref>
            <NavButton 
                variant={active ? "outlined" : "text"} 
                color={active ? "secondary" : "primary"}>
                    {icon} <Typography  sx={{ml:2}} fontSize={size}>{title}</Typography>
            </NavButton>
        </NextLink>
    </ListItem>
    );
};

export const NavActionButton = (props) => {
    const { icon, title, size, action, ...rest } = props;

    return (
    <ListItem
        disableGutters 
        sx={{display: 'flex', mb: 0.5, py: 0, px: 2}}
        {...rest}>
        <NavButton 
            variant="text" 
            color="primary"
            onClick={action ? action : null}>
                {icon} <Typography sx={{ml:2}} fontSize={size}>{title}</Typography>
        </NavButton>
    </ListItem>
    );
};

export const NavMenuButton = (props) => {
    const { items, size, icon, ...rest} = props;
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
                sx={{display: 'flex', mb: 0.5, py: 0, px: 2}}
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
                        {icon} <Typography sx={{ml:2}} fontSize={size}>Services</Typography>
                </NavButton>
            </ListItem>
            <StyledMenu
                id="services-menu"
                anchorEl={smAnchorEl}
                open={smOpen}
                onClose={handleSmClose}
                MenuListProps={{
                'aria-labelledby': 'services-button'
                }}>
                {items.map( i => {
                    const active = i.href ? (router.pathname === i.href) : false;
                    return (
                        <NextLink key={i.title} href={i.href} passHref>
                            <NavMenuItem onClick={handleSmClose}>
                                {i.icon}
                                <Typography sx={{ml:2}} fontSize={size} color={active ? "secondary" : "primary.contrastText"}>
                                {i.title}
                                </Typography>
                            </NavMenuItem>
                        </NextLink>
                    );
                    }
                )}
            </StyledMenu>
        </>
    );
};