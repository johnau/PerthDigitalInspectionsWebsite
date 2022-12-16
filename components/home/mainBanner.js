import NextLink from 'next/link';
import React, { useEffect, useState } from 'react';
import Image from "next/image";
// import { styled } from '@mui/material/styles';
import styled from '@emotion/styled';

import { Box, Button, Card, CardActions, CardMedia, CardContent, Link, Stack, Typography } from "@mui/material";
import Carousel from 'react-material-ui-carousel';
import mainBannerImage from '../../public/static/images/perth_compressed.png';
import logoClean from '../../public/static/images/logo_clean.svg';

import { ChevronRight } from '@mui/icons-material';
import { atHeight } from '../../utility/isInView';

import { useDebouncedEffect } from '../../utility/useDebouncedEffect';
// import { TopExitFade } from '../scroll/scrollAnimation';

import Properties from '../../properties';
import { TopExitFade } from '../scroll/scrollAnimation';

const BlackOnWhiteTypography = styled(Typography)(({ theme }) => ({
    // backgroundColor: "rgba(230,230,230,.5)",
    color: theme.palette.primary.contrastText,
    padding: 4
}));
const BlackOnWhiteStack = styled(Stack)(({ theme }) => ({
    // backgroundColor: "rgba(230,230,230,.7)",
    // color: "#222",
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

const ServiceButton = React.forwardRef(({ onClick, href, ...props }, ref) => {
    return (
        <Button
            href={href}
            onClick={onClick}
            ref={ref}
            variant="contained"
            color={props.color}
            sx={{ m: 2, fontSize: 20, width: 350 }}
            endIcon={<ChevronRight />}
        >
            {props.children}
        </Button>
    );
});

const LogoPositionAnimationBox = styled.div(
    props => ({
        left: props.left,
        top: props.top,
        transition: 'left 0.3s ease-in, top 1s ease-in',
        width: '100%',
        height: 400,
        position: 'relative',
        margin: 0,
        '& div' : {
            width: props.imgW,
            height: props.imgH,
            transition: 'width 0.5s ease, height 0.5s ease, margin 0.5s ease',
            margin: props.margin,
        }
    }),
);

const LogoAnimation = (props) => {
    const { children, ...rest } = props;
    const [left, setLeft] = useState("0%");
    const [top, setTop] = useState(-30);
    const [margin, setMargin] = useState(0);
    const [imageSize, setImageSize] = useState({ width: 640, height: 350});

    const [logoInBar, setLogoInBar] = useState(false);
    const [resizeState, setResizeState] = useState({
        mobileView: false,
    });

    useEffect(() => {
        const procResizeState = () => {
            return window.innerWidth < Properties.mobileViewLimit
                ? setResizeState((prevState) => ({ ...prevState, mobileView: true }))
                : setResizeState((prevState) => ({ ...prevState, mobileView: false }));
        };
        procResizeState();
        window.addEventListener("resize", () => procResizeState());
        return () => window.removeEventListener("resize", () => procResizeState());
    }, []);

    useDebouncedEffect(() => {
        const onScroll = () => {
            if (window.pageYOffset == 0) {
                setLogoInBar(false);
                return;
            }
            if (window.pageYOffset > 150) {
                setLogoInBar(true);
            } else {
                setLogoInBar(false);
            }
        };

        document.addEventListener('scroll', () => onScroll(), true);
        return () => document.removeEventListener('scroll', () => onScroll(), true);
    }, [], 100);

    useEffect(() => {
        // if (resizeState.mobileView) {
        //     setMargin('auto');
        // } else if (!resizeState.mobileView) {
        //     setMargin(0);
        // }

        setMargin('auto'); // not bothering trying to have the logo go to the position on the left for now, always go up

        if (!logoInBar) { // logo on page
            setTop(-30);
            setLeft("0%");
            // setMargin(0);
            setImageSize(prev => ({...prev, width: 650, height: 350}));
        } else if (logoInBar && !resizeState.mobileView) { // logo on left
            setTop(-200);
            setLeft("0%");
            // setMargin(0);
            setImageSize(prev => ({...prev, width: 180, height: 100}));
        } else if (logoInBar && resizeState.mobileView) { // logo in middle
            setTop(-200);
            setLeft("0%");
            // setMargin('auto');
            setImageSize(prev => ({...prev, width: 180, height: 100}));
        }
    }, [logoInBar, resizeState]);

    return (
        <LogoPositionAnimationBox
            left={left}
            top={top}
            imgW={imageSize.width}
            imgH={imageSize.height}
            margin={margin}
        >
            {children}
        </LogoPositionAnimationBox>
    );

};

export const MainBanner = ({ props }) => {
    // let images = [
    //     '/static/images/banner/drone_flyover_max_height.gif',
    //     '/static/images/banner/building_site_flyover.gif',
    //     '/static/images/banner/drone_takeoff.gif'
    // ];

    return (
        <Box sx={{
            position: 'relative',
            left: 0,
            top: 0,
            p: 0,
            m: 0,
            width: '100%',
            height: 1000,
            minWidth: 700,
            overflow: 'hidden',
            backgroundColor: 'background.dark'
        }}>
            {/* <Carousel
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
                </Carousel> */}

            <Box sx={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'background.dark' }}>
                <Box sx={{ position: 'relative', width: '100%', height: '100%'}}>
                    <CoverImage src={mainBannerImage} layout='fill' priority zIndex="0" />
                </Box>
            </Box>

            <BlackOnWhiteStack
                spacing={0}
                sx={{
                    position: 'absolute',
                    width: 700,
                    height: 330,
                    margin: 'auto',
                    left: 0,
                    right: 0,
                    top: 100,
                    display: 'flex',
                    justifyContent: 'center',
                    zIndex: '99'
                }}>
                <TopExitFade offset={50}>
                    <InterTypographyLight
                        sx={{
                            position: 'relative',
                            top: 50,
                            width: 200,
                            margin: 'auto',
                            textAlign: 'center',
                        }}
                        variant="h6">
                        <em>WELCOME TO</em>
                    </InterTypographyLight>
                </TopExitFade>


                {/* <Box sx={{ width: '100%', height: 400, position: 'relative', top: -30 }}> */}
                <LogoAnimation>
                    <Box sx={{ position: 'relative', width: 650, height: 350, margin: 'auto'}}>
                        <Image alt="" layout='fill' src={logoClean} />
                    </Box>
                </LogoAnimation>
                {/* </Box> */}

                <InterTypographyLight
                    variant="h6"
                    sx={{ position: 'relative', width: '100%', bottom: 100, textAlign: 'center' }}>
                    <em>Surface Anaylsis, Virtual Tour, and Aerial Photography services for Perth and Peel regions</em>
                </InterTypographyLight>
            </BlackOnWhiteStack>

            {/* <Stack direction="row" spacing={2} sx={{ position: 'absolute', minWidth: 700, margin: 'auto', left: 0, right: 0, bottom: 30, justifyContent: 'center', zIndex: '99' }}> */}
            <Box sx={{ display: 'flex', flexWrap: 'wrap', width: '50%', position: 'absolute', margin: 'auto', left: 0, right: 0, bottom: 30, justifyContent: 'center' }}>
                <NextLink href='/services/residential' passHref>
                    <ServiceButton color="primary">
                        Residential Services
                    </ServiceButton>
                </NextLink>
                <NextLink href='/services/commercial' passHref>
                    <ServiceButton color="secondary">
                        Commercial Services
                    </ServiceButton>
                </NextLink>
            </Box>
            {/* </Stack> */}
        </Box>

    );
};

