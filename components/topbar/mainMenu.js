import { Stack } from '@mui/material';
import { NavLinkButton, NavMenuButton } from './navButton';

import { Navigation as navMenuItems } from '../../data/navigation';

export const MainMenu = ({type, size, action, ...props}) => {
    return (
        <Stack 
            direction={type === 'top' ? "row" : "column"} 
            spacing={type === 'top' ? 2 : type === 'contained' && 3} 
            sx={{ width: 500, justifyContent: 'center'}}
            backgroundColor={type === 'contained' ? 'background.dark' : null} >

            { navMenuItems.map( mi => {
                if (mi.items) {
                    return (<NavMenuButton key={mi.title} sx={{justifyContent: 'center'}} items={mi.items} size={size} icon={mi.icon} />);
                } else {
                    return (<NavLinkButton key={mi.title} sx={{justifyContent: 'center'}} title={mi.title} href={mi.href} icon={mi.icon} size={size}/>); 
                }
            })}

        </Stack>
    );
};

