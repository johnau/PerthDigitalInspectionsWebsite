import { Box, Button, Card, CardActions, CardMedia, CardContent, Container, Link, Stack, Divider, Typography } from "@mui/material";
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Image from "next/image";
import { TitleBanner } from "../titleBanner";

import { CompanyBannerContent as bannerContent } from "../../data/companyBannerContent";

const GreyBox = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.background.light
}));

const LightTypography = styled(Typography)(({ theme }) => ({
    fontFamily: "InterLight, sans-serif",
}));

export const CompanyBanner = ({ props }) => {

    return (
    <>
        <TitleBanner title={bannerContent.title} />
        <GreyBox>
            <Container sx={{ width: '100%', my: 5, alignItems: 'center' }}>
                <Stack direction="row" sx={{mt: 2, justifyContent: 'center'}} spacing={2}>
                    {bannerContent.owners.map( o => (
                        <Stack key={o.key} spacing={2}>
                            <Image alt={o.name} width="300" height="300" src="/static/images/profile.jpg" />
                            <LightTypography variant="body1" textAlign='center' color="neutral.600">{o.name}</LightTypography>
                            {
                                o.qualifications.map( q => (
                                    <LightTypography key={q.key} variant="body1" textAlign='center' color="neutral.600">{q.name}</LightTypography>
                                ))
                            }
                        </Stack>
                    ))}
                </Stack>
                <Box sx={{ mt: 2, width: '100%', justifyContent: 'center', display: 'flex', flexDirection: 'column'}}>
                    {bannerContent.texts.map( text => (
                        <LightTypography key={text.key} sx={{ my: 2}} variant="body1" textAlign="center" color="neutral.600">{text.text}</LightTypography>
                    ))}
                </Box>
            </Container>
        </GreyBox>
    </>        

    );

};

