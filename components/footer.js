import { Box, Button, Card, CardActions, CardMedia, CardContent, Container, Link, Stack, Divider, Typography } from "@mui/material";
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Image from "next/image";

const LightTypography = styled(Typography)(({ theme }) => ({
    fontFamily: "InterLight, sans-serif",
}));

const BoldTypography = styled(Typography)(({ theme }) => ({
    fontFamily: "InterBold, sans-serif",
}));

export const Footer = (props) => {
    return (
        <Box sx={{minWidth: 700}} {...props}>
            <Container sx={{ width: '100%', my: 5, alignItems: 'center' }}>
                <Box sx={{width: '100%', justifyContent: 'center', display: 'flex'}}>
                    <LightTypography variant="body1" textAlign='center' color="primary.contrastText"><em>Thank you for visiting</em></LightTypography>
                </Box>
                <Stack direction="row" sx={{ width: '100%', justifyContent: 'center'}}>
                    <Image alt="" width="200px" height="130px" src="/static/images/logo_blue.svg" />
                    <BoldTypography sx={{ fontSize: 58, mt: 2.8, ml: -3}} textAlign='left' color="primary.contrastText">PERTH DIGITAL INSPECTIONS</BoldTypography>
                </Stack>
                <Box sx={{display: 'flex', flexWrap: 'wrap', width: '100%', justifyContent: 'center' }}>
                    <Stack sx={{ width: 300 }} spacing={2}>
                        <LightTypography variant="body2" textAlign='left' color="primary.contrastText">Contact Us:</LightTypography>
                        <LightTypography variant="body2" textAlign='left' color="primary.contrastText">Phone</LightTypography>
                        <LightTypography variant="body2" textAlign='left' color="primary.contrastText">Email</LightTypography>
                    </Stack>
                    <Divider orientation="vertical"/>
                    <Stack sx={{ width: 300 }} spacing={2}>
                        <LightTypography variant="body2" textAlign='left' color="primary.contrastText">Operating Hours:</LightTypography>
                        <LightTypography variant="body2" textAlign='left' color="primary.contrastText">Mon-Fri: 9AM - 5PM</LightTypography>
                        <LightTypography variant="body2" textAlign='left' color="primary.contrastText">Sat-Sun: SMS / Email only</LightTypography>
                    </Stack>
                    <Divider orientation="vertical"/>
                    <Stack sx={{ width: 300 }} spacing={2}>
                        <LightTypography variant="body2" textAlign='left' color="primary.contrastText">Licences:</LightTypography>
                        <LightTypography variant="body2" textAlign='left' color="primary.contrastText">RePL</LightTypography>
                        <LightTypography variant="body2" textAlign='left' color="primary.contrastText">Other</LightTypography>
                    </Stack>
                </Box>
            </Container>
        </Box>
    );

};

