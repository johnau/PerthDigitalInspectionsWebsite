import { Box, Button, Card, CardActions, CardMedia, CardContent, Container, Link, Stack, Typography } from "@mui/material";
import * as React from 'react';
import { styled } from '@mui/material/styles';

const WhiteBox = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.background.paper
}));

const LightTypography = styled(Typography)(({ theme }) => ({
    fontFamily: "InterLight, sans-serif",
}));

export const TitleBanner = ({ title, ...props }) => {
    return (
        <WhiteBox>
            <Container sx={{ width: '100%', my: 5, alignItems: 'center' }}>
                <LightTypography variant="h4" textAlign='center' color="neutral.600">{title}</LightTypography>
            </Container>
        </WhiteBox>
    );
};

