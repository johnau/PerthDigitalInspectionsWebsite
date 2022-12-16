import Head from 'next/head';
import { styled } from '@mui/material/styles';
import { Box, Button, Stack, Typography } from '@mui/material';

import { ApplicationLayout } from '../components/applicationLayout';
import { TitleBanner } from '../components/titleBanner';
import { MainBanner } from '../components/home/mainBanner';
import { AboutBanner } from '../components/home/aboutBanner';
import { ServiceBannerComponent } from '../components/home/serviceBannerComponent';
import { CompanyBanner } from '../components/home/companyBanner';

import { ServicesList as servicesList } from '../data/servicesList';
import { IndexContent as indexContent } from '../data/indexContent';

import { PanoramaPannellum } from '../components/pannellumPano';

import { AerialPano } from '../components/home2/aerialPano';

import ScrollFocusFader from '../components/scrollFocusFader';
import ScrollFocusZoomer from '../components/scrollFocusZoomer';
import Image from 'next/image';

import useFitText from '../utility/fitText';


import { elementsPercentInView } from '../utility/isInView';
import React, { useEffect } from 'react';
// import TopExitFade from '../components/scroll/scrollAnimation';
import { FocusFade, TopExitFade, TextZoom, StickForAWhile, SizeChange2Step } from '../components/scroll/scrollAnimation';
import { VrTourPanos } from '../components/home2/vrTourPanos';
import { StickFadeZoom } from '../components/scroll/scrollComponent';

import dummyImage from '../public/static/images/aerial.png';
import { ChevronRight } from '@mui/icons-material';

import NextLink from 'next/link';

// const LogoTileBgStack = styled(Stack)(({ theme }) => ({
//     ":before": {
//         content: `''`,
//         position: 'fixed',
//         width: '200%',
//         height: '200%',
//         top: '-50%',
//         left: '-50%',
//         zIndex: '-1',
//         background: "url('/static/images/logo_clean_black.svg')",
//         backgroundRepeat: 'repeat',
//         backgroundSize: '80px 50px',
//         transform: 'rotate(22.5deg)',
//         backdropFilter: 'brightness(20%)'
//     }
// }));

const CoverImage = styled(Image)(({ theme }) => ({
    objectFit: 'cover'
}));

const DummyImageForScrollZoomer = () => {
    return (
        <Box sx={{ position: 'relative', width: '100%', height: 550, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <CoverImage src={dummyImage} layout='fill' />
        </Box>
    )
};

const DummyTextVectorForScrollZoomer = () => {
    return (
        <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <CoverImage src='/static/images/textvector/makeyourpropertystandout.svg' width='1500px' height='90px' />
        </Box>
    )
};

const SemiBoldTypography = styled(Typography)(({ theme }) => ({
    fontFamily: "InterSemiBold, sans-serif",
}));

const VirtualToursTitle = () => <SemiBoldTypography variant="h1" sx={{ p: 10, pb: 0, textAlign: 'center', color: "#eee" }}>Immersive Virtual Property Tours</SemiBoldTypography>;
const AnalysisTitle = () => <SemiBoldTypography variant="h1" sx={{ p: 10, pb: 0, textAlign: 'center', color: "#eee" }}>Property and Structure Analysis</SemiBoldTypography>;
const AerialPhotoTitle = () => <SemiBoldTypography variant="h1" sx={{ p: 10, pb: 0, textAlign: 'center', color: "#eee" }}>Aerial Photography</SemiBoldTypography>;

const ViewInteractiveExampleButton = React.forwardRef(({ onClick, href }, ref) => {
    return (
        <Button
            href={href}
            onClick={onClick}
            ref={ref}
            variant="contained"
            endIcon={<ChevronRight />}
            sx={{ width: 300 }}
        >
            View interactive example
        </Button>
    );
});

const ApplicationIndex = () => {

    const titleStickHeight = 200;

    const titleContentGap = 250;
    const vrTourContentHeight = 550;
    const vrTourSectionHeight = vrTourContentHeight + titleContentGap;

    const focusFadeOffset = 500;

    return (
        <>
            <Head>
                <title>
                    {indexContent.pageTitle}
                </title>
            </Head>
            <Box sx={{ minWidth: 700 }}>

                <Box sx={{ bgcolor: "background.dark" }}>
                    <TopExitFade offset={25}>
                        <MainBanner />
                    </TopExitFade>
                </Box>

                <Stack spacing={0} sx={{ bgcolor: "background.dark" }}>
                    <Box sx={{ py: 10 }}>
                        <StickForAWhile stickHeight={titleStickHeight}>
                            <TextZoom fontSizeLimit={50} fontSizeRatio={50} offset={5}>
                                <FocusFade offset={focusFadeOffset}>
                                    <TopExitFade offset={50}>
                                        <Stack direction="column" spacing={2} sx={{ width: '100%', alignItems: 'center', pb: 2 }}>
                                            <VirtualToursTitle />
                                            <NextLink href='/tours/example' passHref legacyBehavior>
                                                <ViewInteractiveExampleButton />
                                            </NextLink>
                                        </Stack>
                                    </TopExitFade>
                                </FocusFade>
                            </TextZoom>
                        </StickForAWhile>
                        {/* Note:
                            Box (id "stick_A") height determines when the above title moves on up the page
                            Box (id "stick_B") top determines when the below content will start appearing
                            Box (id "stick_C") height determines how long the content will stick for, it will be related to "stick_B" top and height of content
                        */}
                        <Box id="stick_A" sx={{ position: "static", width: "100%", height: (titleContentGap + vrTourSectionHeight) }}>
                            <Box id="stick_B" sx={{ width: "100%", justifyContent: 'center' }}>
                                <Box sx={{ height: titleContentGap }} />
                                <StickForAWhile stickHeight={400} backgroundColor="#fff">
                                    <SizeChange2Step contentHeight={550} wid1={0.33} wid2={0.66} wid3={1.0}>
                                        <FocusFade offset={focusFadeOffset}>
                                            <TopExitFade offset={50}>
                                                <DummyImageForScrollZoomer />
                                            </TopExitFade>
                                        </FocusFade>
                                    </SizeChange2Step>
                                </StickForAWhile>
                                <Box id="stick_C" sx={{ height: vrTourSectionHeight }} />
                            </Box>
                        </Box>
                    </Box>

                    {/* 
                    <VrTourPanos /> 
                    */}

                    {/* 
                    <Box sx={{ py: 10, zIndex: 50 }}>
                        <Box sx={{ py: 10, zIndex: 50 }}>
                            <StickForAWhile stickHeight={titleStickHeight}>
                                <TextZoom fontSizeLimit={50} fontSizeRatio={50} offset={5}>
                                    <FocusFade offset={3}>
                                        <VirtualToursTitle />
                                    </FocusFade>
                                </TextZoom>
                            </StickForAWhile>
                            <StickFadeZoom>
                                <DummyImageForScrollZoomer />
                            </StickFadeZoom>
                        </Box>
                    </Box> 
                    */}

                    <Box sx={{ width: "100%", height: titleContentGap }} />
                    <Box sx={{ py: 10 }}>
                        <StickForAWhile stickHeight={titleStickHeight}>
                            <TextZoom fontSizeLimit={50} fontSizeRatio={50} offset={5}>
                                <FocusFade offset={focusFadeOffset}>
                                    <TopExitFade offset={50}>
                                        <Stack direction="column" spacing={2} sx={{ width: '100%', alignItems: 'center', pb: 2 }}>
                                            <AnalysisTitle />
                                            <NextLink href='/tours/example' passHref legacyBehavior>
                                                <ViewInteractiveExampleButton />
                                            </NextLink>
                                        </Stack>
                                    </TopExitFade>
                                </FocusFade>
                            </TextZoom>
                        </StickForAWhile>
                        <Box sx={{ width: "100%", height: "600px" }} />
                    </Box>
                    <Box sx={{ py: 10 }}>
                        <StickForAWhile stickHeight={titleStickHeight}>
                            <TextZoom fontSizeLimit={50} fontSizeRatio={50} offset={5}>
                                <FocusFade offset={focusFadeOffset}>
                                    <TopExitFade offset={50}>
                                        <Stack direction="column" spacing={2} sx={{ width: '100%', alignItems: 'center', pb: 2 }}>
                                            <AerialPhotoTitle />
                                            <ViewInteractiveExampleButton />
                                        </Stack>
                                    </TopExitFade>
                                </FocusFade>
                            </TextZoom>
                        </StickForAWhile>
                        <Box sx={{ width: "100%", height: "1200px" }} />
                    </Box>
                </Stack>
                {/* <AerialPano /> */}

                {/* <Panorama /> */}
                <Stack spacing={0} sx={{ bgcolor: "background.paper" }}>
                    <PanoramaPannellum />
                    <Box sx={{
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'center'
                    }}>

                    </Box>

                    <TitleBanner title={indexContent.servicesTitle} />
                    {/* <LogoTileBgStack spacing={16} sx={{ backdropFilter: 'blur(0)', overflow: 'hidden'}}>  */}
                    {/* For some reason backdropFilter: has to be included for the background to show.... odd */}
                    {/* {
                    servicesList.map(element => 
                        <ServiceBannerComponent key={element.title} pdiService={element} />
                    )
                } */}
                    {/* </LogoTileBgStack> */}
                    <Box sx={{ display: 'relative' }}>
                        <ScrollFocusFader steps={3} offset={-0.4}>
                            <DummyImageForScrollZoomer />
                        </ScrollFocusFader>
                        <ScrollFocusZoomer steps={16} offset={-0.5} minZoom={0.1} height="600px" justifyContent="center">
                            <DummyTextVectorForScrollZoomer />
                        </ScrollFocusZoomer>
                        <ScrollFocusZoomer steps={16} offset={0} minZoom={0.25} height="1200px">
                            <DummyImageForScrollZoomer />
                        </ScrollFocusZoomer>
                    </Box>
                    <AboutBanner />
                    <AboutBanner />

                    <CompanyBanner />
                </Stack>
            </Box>
        </>
    )
};

ApplicationIndex.getLayout = (page) => (
    <ApplicationLayout>
        {page}
    </ApplicationLayout>
);

export default ApplicationIndex;