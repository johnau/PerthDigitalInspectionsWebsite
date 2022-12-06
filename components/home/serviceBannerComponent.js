import NextLink from 'next/link';
import { Box, Button, Card, CardActions, CardMedia, CardContent, Container, Divider, Link, Paper, Stack, Typography } from "@mui/material";
import * as React from 'react';
import { styled } from '@mui/material/styles';
import { useState } from "react";
import Carousel from "react-material-ui-carousel";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Image from "next/image";

const GreyBox = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.neutral[200]
}));

const LightTypography = styled(Typography)(({ theme }) => ({
    fontFamily: "InterLight, sans-serif",
}));

const SemiBoldTypography = styled(Typography)(({ theme }) => ({
    fontFamily: "InterSemiBold, sans-serif",
}));

const CoverImage = styled(Image)(({ theme }) => ({
    objectFit: 'cover'
}));

const Item = (props) => {
    return (
        <CoverImage alt={props.item.title} src={props.item.image} layout='fill'/>
    )
};

export const ServiceBannerComponent = ({ pdiService, ...props }) => {

    const [texts, setTexts] = useState(pdiService.textContent);

    // const imageItems = [
    //     {
    //         name: "A",
    //         image: '/static/images/3dtour256.png'
    //     },
    //     {
    //         name: "B",
    //         image: '/static/images/aerial256.png'
    //     }
    // ]

    return (
            <GreyBox>
                <Box sx={{ width: '100%', height: 600}}>
                    <Carousel
                        sx={{ width: '100%', height: 600}}
                        interval={7000}
                        duration={700}
                        animation='slide'
                        swipe={true}
                        navButtonsAlwaysVisible={true}
                        cycleNavigation={true}
                        fullHeightHover={true}     // We want the nav buttons wrapper to only be as big as the button element is
                        navButtonsProps={{          
                            style: {
                                backgroundColor: '#ddd',
                                color: '#333',
                                opacity: 0.5,
                                borderRadius: 0,
                                width: 80,
                                height: 100,

                            }
                        }} 
                        navButtonsWrapperProps={{   // Move the buttons to the bottom. Unsetting top here to override default style.
                            style: {
                                top: 'unset',
                                bottom: 50
                            }
                        }} 

                        NextIcon={<ChevronRightIcon />}
                        PrevIcon={<ChevronLeftIcon />}
                    >
                    {
                        pdiService.images.map( (item, i) => <Item key={i} item={item} /> )
                    }
                    </Carousel>
                </Box>

                <Container sx={{ maxWidth: 1000, my: 5, alignItems: 'center', alignContent: 'center' }}>
                    <SemiBoldTypography variant="h4" textAlign='center' color="neutral.600">{pdiService.title}</SemiBoldTypography>
                    <Stack sx={{my: 2, justifyContent: 'center', alignItems: 'center'}} spacing={2}>

                    {
                        texts.map( (t) =>  <LightTypography key={t} variant="body1" textAlign='center' color="neutral.600">{t}</LightTypography> )
                    }


                    </Stack>
                    <Divider />
                    <Box sx={{backgroundColor: 'neutral.100', pb: 3, pt: 0.5, width: 500, margin: 'auto', mt: 4}}>
                        <Box sx={{mt:2, display: 'flex', width: '100%', justifyContent: 'center'}}>
                            <LightTypography variant="body1" textAlign='center' width="300px" color="neutral.600">More information: </LightTypography>   
                        </Box>
                        <Stack direction="row" 
                            spacing={2} 
                            sx={{ justifyContent: 'center', alignItems: 'center', width: '100%', mx: 'auto' }}>
                            <NextLink href='/services/residential' passHref>
                                <Button variant="text" color="primary">
                                    <u>Residential Services</u>
                                </Button>
                            </NextLink>
                            <Divider orientation='vertical' flexItem/>
                            <NextLink href='/services/commercial' passHref>
                                <Button variant="text" color="secondary">
                                    <u>Commercial Services</u>
                                </Button>
                            </NextLink>
                        </Stack>
                    </Box>
                </Container>
            </GreyBox>
    );

};

