import Head from 'next/head';
import { styled } from '@mui/material/styles';
import { Box, Button, Card, CardMedia, Stack, Typography } from '@mui/material';

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

import makepropertystandout from '../public/static/images/makepropertystandout.png';

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
        // <Box sx={{ position: 'relative', width: '100%', height: 550, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Box sx={{ position: 'relative', width: '100%', height: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
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

const SectionTitle = ({ title, ...props }) => <SemiBoldTypography variant="h1" sx={{ p: 10, pb: 0, textAlign: 'center', color: "#eee" }}>{title}</SemiBoldTypography>;
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
ViewInteractiveExampleButton.displayName = "ViewInteractiveExampleButton";


const IndexSection = ({ title, ...props }) => {
    const { children, ...rest } = props;
    const vrTourContentHeight = 800;
    const titleContentGap = 300;

    const titleStickHeight = 50;
    const focusFadeOffset = 500;

    return (
        <>
            <Box sx={{ py: 10 }}>
                <StickForAWhile stickHeight={titleStickHeight}>
                    <TextZoom fontSizeLimit={50} fontSizeRatio={50} offset={5}>
                        <FocusFade offset={focusFadeOffset}>
                            <TopExitFade offset={50}>
                                <Stack direction="column" spacing={2} sx={{ width: '100%', alignItems: 'center', pb: 2 }}>
                                    <SectionTitle title={title} />
                                    <NextLink href='/tours/example' passHref legacyBehavior>
                                        <ViewInteractiveExampleButton />
                                    </NextLink>
                                </Stack>
                            </TopExitFade>
                        </FocusFade>
                    </TextZoom>
                </StickForAWhile>
                <Box id="stick_A" sx={{ position: "static", width: "100%", height: (titleContentGap + 600) }}>
                    <Box sx={{ width: "100%", justifyContent: 'center' }}>
                        <Box id="stick_B" sx={{ height: titleContentGap }} />
                        <StickForAWhile stickHeight={250} backgroundColor="#fff">
                            <SizeChange2Step contentHeight={vrTourContentHeight} wid1={0.2} wid2={0.5} wid3={1.0}>
                                <FocusFade offset={650}>
                                    <TopExitFade offset={0}>
                                        {children}
                                    </TopExitFade>
                                </FocusFade>
                            </SizeChange2Step>
                        </StickForAWhile>
                        <Box id="stick_C" sx={{ height: 600 }} />
                    </Box>
                </Box>
            </Box>
            <Box sx={{ width: "100%", height: vrTourContentHeight }} /> {/* Each section must be preceeded by this spacer, except of course first */}
        </>
    );

};




const ApplicationIndex = () => {
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
                    <IndexSection title="Immersive Virtual Property Tours">
                        <DummyImageForScrollZoomer />
                    </IndexSection>
                    <IndexSection title="Property and Structural Analaysis">
                        <DummyImageForScrollZoomer />
                    </IndexSection>
                    <IndexSection title="Aerial Photography">
                        <DummyImageForScrollZoomer />
                    </IndexSection>
                </Stack>

                <Stack spacing={0} sx={{ bgcolor: "background.dark" }}>
                    <Box sx={{ height: 400, zIndex: 20 }} >
                        <TextZoom fontSizeLimit={200} fontSizeRatio={150} offset={0}>
                            <FocusFade offset={500}>
                                <TopExitFade offset={20}>
                                    <Stack direction="column" spacing={2} sx={{ width: '100%', alignItems: 'center', pb: 2, overflow: 'hidden' }}>
                                        <SemiBoldTypography sx={{ pt: 10, color: 'primary.contrastText' }} noWrap={true}>MAKE YOUR PROPERTY</SemiBoldTypography>
                                        <SemiBoldTypography sx={{ pb: 0, color: 'primary.contrastText' }} noWrap={true}>STAND OUT!</SemiBoldTypography>
                                    </Stack>
                                </TopExitFade>
                            </FocusFade>
                        </TextZoom>
                    </Box>

                    <Box sx={{ position: 'relative', width: '100%', height: 600, zIndex: 10 }}>
                        <CoverImage src={makepropertystandout} layout='fill' />
                    </Box>
                    <Box sx={{ height: 1000 }} />
                </Stack>


                <Stack spacing={0} sx={{ bgcolor: "background.paper" }}>
                    {/* <AerialPano /> */}
                    {/* <Panorama /> */}
                    <PanoramaPannellum />
                    <AboutBanner />
                    {/* <CompanyBanner /> */}
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