import * as React from 'react';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import { styled } from '@mui/material/styles';
import RequestQuoteIcon from '@mui/icons-material/RequestQuote';

const BoxBottomRight = styled(Box)(({ theme }) => ({
    

}));

const DarkFab = styled(Fab)(({ theme }) => ({
    backgroundColor: theme.palette.background.dark,
    color: theme.palette.secondary.main,
    borderColor: theme.palette.background.paper,
    border: '1px dashed',
    '&:hover': {
        backgroundColor: theme.palette.secondary.main,
        color: theme.palette.background.dark,
    },

    boxShadow: theme.shadows[8],

}));


export const RequestQuoteFab = ({ pagePos, ...props }) => {

    return (
        <BoxBottomRight
            {...props}
            sx={{
                '& > :not(style)': { m: 0.5 },
                position: pagePos === 'floating' ? 'fixed' : 'relative',
                right: pagePos === 'floating' ? 40 : 0,
                bottom: pagePos === 'floating' ? 40 : 0,
                transition: 'bottom, margin 0.4s ease',
                my: pagePos === 'floating' ? 0 : 5,
                zIndex: 1000
            }}
        >
            <DarkFab variant="extended" aria-label="add"
            sx={{
                fontSize: pagePos === 'floating' ? 18 : 40
            }}>
                <RequestQuoteIcon sx={{ 
                    mr: 1,
                    fontSize: pagePos === 'floating' ? 18 : 40
                }}/>
                Request a Quote
            </DarkFab>
        </BoxBottomRight>
    );
}