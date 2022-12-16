import Head from 'next/head';
import { styled } from '@mui/material/styles';
import { Box, Stack, Typography } from '@mui/material';

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
import { useEffect } from 'react';
// import TopExitFade from '../components/scroll/scrollAnimation';
import { FocusFade, TopExitFade, TextZoom, StickForAWhile } from '../components/scroll/scrollAnimation';
import { VrTourPanos } from '../components/home2/vrTourPanos';

const LogoTileBgStack = styled(Stack)(({ theme }) => ({
    ":before": {
        content: `''`,
        position: 'fixed',
        width: '200%',
        height: '200%',
        top: '-50%',
        left: '-50%',
        zIndex: '-1',
        background: "url('/static/images/logo_clean_black.svg')",
        backgroundRepeat: 'repeat',
        backgroundSize: '80px 50px',
        transform: 'rotate(22.5deg)',
        backdropFilter: 'brightness(20%)'
    }
}));

const CoverImage = styled(Image)(({ theme }) => ({
    objectFit: 'cover'
}));

const DummyImageForScrollZoomer = () => {
    return (
        <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <CoverImage src='/static/images/aerialpano/02_preview.jpg' width='2000px' height='700px' />
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

const VirtualToursTitle = () => <SemiBoldTypography variant="h1" sx={{ p: 10, textAlign: 'center', color: "#eee" }}>Immersive Virtual Property Tours</SemiBoldTypography>;
const AnalysisTitle = () => <SemiBoldTypography variant="h1" sx={{ p: 10, textAlign: 'center', color: "#eee" }}>Property and Structure Analysis</SemiBoldTypography>;
const AerialPhotoTitle = () => <SemiBoldTypography variant="h1" sx={{ p: 10, textAlign: 'center', color: "#eee" }}>Aerial Photography</SemiBoldTypography>;

const ApplicationIndex = () => {

    const titleStickHeight = 200;

    return (
        <>
            <Head>
                <title>
                    {indexContent.pageTitle}
                </title>
            </Head>
            <Box sx={{ minWidth: 700 }}>

                <Box sx={{ bgcolor: "background.dark" }}>
                    <TopExitFade>
                        <MainBanner />
                    </TopExitFade>
                </Box>

                <Stack spacing={0} sx={{ bgcolor: "background.dark" }}>
                    <Box sx={{ py: 10, zIndex: 50 }}>
                        <StickForAWhile stickHeight={titleStickHeight}>
                            <TextZoom fontSizeLimit={50} fontSizeRatio={50} offset={5}>
                                <FocusFade offset={3}>
                                    <VirtualToursTitle />
                                </FocusFade>
                            </TextZoom>
                        </StickForAWhile>
                        <Box sx={{ position: "relative", width: "100%", height: 3650 }}>
                            <Box sx={{ position: 'absolute', top: 900, width: "100%", justifyContent: 'center' }}>
                                <VrTourPanos />
                            </Box>
                        </Box>
                    </Box>
                    <Box sx={{ width: "100%", height: 200 }} />
                    <Box sx={{ py: 10, zIndex: 99 }}>
                        <StickForAWhile stickHeight={titleStickHeight}>
                            <TextZoom fontSizeLimit={50} fontSizeRatio={50} offset={5}>
                                <FocusFade offset={3}>
                                    <AnalysisTitle />
                                </FocusFade>
                            </TextZoom>
                        </StickForAWhile>
                        <Box sx={{ width: "100%", height: "600px" }} />
                    </Box>
                    <Box sx={{ py: 10, zIndex: 99 }}>
                        <StickForAWhile stickHeight={titleStickHeight}>
                            <TextZoom fontSizeLimit={50} fontSizeRatio={50} offset={5}>
                                <AerialPhotoTitle />
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
                        <ScrollFocusFader children={<DummyImageForScrollZoomer />} steps={3} offset={-0.4} />
                        <ScrollFocusZoomer children={<DummyTextVectorForScrollZoomer />} steps={16} offset={-0.5} minZoom={0.1} height="600px" justifyContent="center" />
                        <ScrollFocusZoomer children={<DummyImageForScrollZoomer />} steps={16} offset={0} minZoom={0.25} height="1200px" />
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