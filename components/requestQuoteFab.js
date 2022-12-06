import * as React from 'react';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import { styled } from '@mui/material/styles';
import RequestQuoteIcon from '@mui/icons-material/RequestQuote';

const BoxBottomRight = styled(Box)(({ theme }) => ({
    position: 'fixed',
    right: 40,
    bottom: 40
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
    fontSize: 18
}));


export default function RequestQuoteFab() {
  return (
    <BoxBottomRight sx={{ '& > :not(style)': { m: 0.5 } }}>
      <DarkFab variant="extended" aria-label="add">
        <RequestQuoteIcon sx={{ mr: 1 }} />
        Request a Quote
      </DarkFab>
    </BoxBottomRight>
  );
}