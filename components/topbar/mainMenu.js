import { Stack } from '@mui/material';
import { NavLinkButton, NavMenuButton } from './navButton';

import { Navigation as navMenuItems } from '../../data/navigation';

export const MainMenu = ({ type, size, action, showIcons, ...props }) => {

    const dir = type === 'top' ? "row" : "column";
    const spc = type === 'top' ? 2 : type === 'contained' && 3;
    const bgc = type === 'contained' ? 'background.dark' : null;

    return (
        <Stack
            direction={dir}
            spacing={spc}
            sx={{ width: 500, justifyContent: 'center' }}
            backgroundColor={bgc}
        >
            {navMenuItems.map(mi => {
                if (mi.items) {
                    return (
                        <NavMenuButton
                            key={mi.title}
                            sx={{ justifyContent: 'center' }}
                            items={mi.items}
                            size={size}
                            icon={mi.icon}
                            showIcons={showIcons}
                            type={type === 'top' ? 'desktop_menu' : 'mobile_menu'}
                        />
                    );
                } else {
                    return (
                        <NavLinkButton
                            key={mi.title}
                            sx={{ justifyContent: 'center' }}
                            title={mi.title}
                            href={mi.href}
                            icon={mi.icon}
                            size={size}
                            showIcons={showIcons}
                        />
                    );
                }
            })}

        </Stack>
    );
};

