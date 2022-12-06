import NextLink from 'next/link';
import Image from "next/image";
import { styled } from '@mui/material/styles';

import { Box, Button, Card, CardActions, CardMedia, CardContent, Link, Stack, Typography } from "@mui/material";
import Carousel from 'react-material-ui-carousel';

const BlackOnWhiteTypography = styled(Typography)(({ theme }) => ({
    // backgroundColor: "rgba(230,230,230,.5)",
    color: "#222",
    padding: 4
}));
const BlackOnWhiteStack = styled(Stack)(({ theme }) => ({
    backgroundColor: "rgba(230,230,230,.7)",
    color: "#222",
    padding: 4
}));

const InterTypography = styled(BlackOnWhiteTypography)(({ theme }) => ({
    fontFamily: "InterSemiBold, sans-serif",
}));
const InterTypographyLight = styled(BlackOnWhiteTypography)(({ theme }) => ({
    fontFamily: "InterLight, sans-serif",
}));
const InterTypographyMedium = styled(BlackOnWhiteTypography)(({ theme }) => ({
    fontFamily: "InterMedium, sans-serif",
    padding: 4
}));
const CoverImage = styled(Image)(({ theme }) => ({
    objectFit: 'cover'
}));

export const MainBanner = ({ props }) => {

    // Need to store the images in state, link the state to the carousel, use a timer (syncd with the coursel?) to clear the image list and restore to reload the carousel.

    let images = [
        '/static/images/banner/drone_flyover_max_height.gif',
        '/static/images/banner/building_site_flyover.gif',
        '/static/images/banner/drone_takeoff.gif'
    ];

    return (

            <Box sx={{ position: 'relative', left: 0, top: 0, p:0, m:0, width: '100%', height: 600, minWidth: 700, overflow: 'hidden' }}>
                <Carousel
                    sx={{ width: '100%', height: 600}}
                    interval={8000}
                    duration={1000}
                    animation='fade'
                    swipe={false}
                    navButtonsAlwaysVisible={false}
                    cycleNavigation={true}
                    fullHeightHover={false}>
                {
                    images.map( (item, i) => <CoverImage key={i} src={item} layout='fill' loading="lazy"/> )
                }
                </Carousel>

                <BlackOnWhiteStack sx={{ position: 'absolute', width: 700, height: 330, margin: 'auto', left: 0, right: 0, top: 100, display: 'flex', justifyContent: 'center', zIndex: '99' }} spacing={0}>
                    <InterTypographyLight color='primary.contrastText' sx={{ position: 'relative', top: 80, width: 200, margin: 'auto', textAlign:'center' }} variant="h6">
                        <em>WELCOME TO</em>
                    </InterTypographyLight>
                    <Box sx={{width: '100%'}}>
                        <Image alt="" width="650" height="350" src="/static/images/logo_clean_black.svg" />
                    </Box>
                    <InterTypographyMedium 
                        color='primary.contrastText'
                        variant="h5"
                        sx={{ position: 'relative', width: 690, top: -85, textAlign:'center'}}>
                            <em>Providing virtual tour, aerial panorama, and surface analysis services to the Perth and Peel regions</em>
                    </InterTypographyMedium>
                </BlackOnWhiteStack>

                <Stack direction="row" spacing={2} sx={{ position: 'absolute', minWidth: 700, margin: 'auto', left: 0, right: 0, bottom: 30, justifyContent: 'center', zIndex: '99' }}>
                    <NextLink href='/services/residential' passHref>
                        <Button variant="contained" color="primary">
                            Residential Services
                        </Button>
                    </NextLink>
                    <NextLink href='/services/commercial' passHref>
                        <Button variant="contained" color="secondary">
                            Commercial Services
                        </Button>
                    </NextLink>
                </Stack>
            </Box>

    );
};

