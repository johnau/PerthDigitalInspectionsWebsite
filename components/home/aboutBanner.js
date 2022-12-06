import * as React from 'react';
import Image from "next/image";
import { styled } from '@mui/material/styles';
import { Box, Container, Stack, Divider, Typography } from "@mui/material";
import { AboutBannerContent as aboutContent } from '../../data/aboutBannerContent';

const GreyBox = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.background.light
}));

const LightTypography = styled(Typography)(({ theme }) => ({
    fontFamily: "InterLight, sans-serif",
}));

export const AboutBanner = (props) => {
    return (
        <GreyBox {...props}>
            <Container sx={{ maxWidth: 1000, my: 5, alignItems: 'center' }}>
                <LightTypography sx={{mt:10}} variant="h4" textAlign='center' color="neutral.600">{aboutContent.title}</LightTypography>
                <Box sx={{display: 'flex', flexWrap: 'wrap', mt: 2, justifyContent: 'center'}}>
                {aboutContent.texts.map( (text) => (
                    <LightTypography key={text.key} sx={{maxWidth: 300, m: 2}} variant="body1" textAlign='center' color="neutral.600">
                        {text.text}
                    </LightTypography>    
                ))}
                </Box>
                <Divider sx={{mt: 5}} />
                <Stack direction="row" sx={{mt: 6, justifyContent: 'center'}} spacing={2}>
                {aboutContent.logos.map( (src) => (
                    <Box key={src.key} >
                        <Image alt="WA Civil Aviation" width="150" height="50" src={src.src} />
                    </Box>
                ))}
                </Stack>
            </Container>
            
        </GreyBox>
    );

};

