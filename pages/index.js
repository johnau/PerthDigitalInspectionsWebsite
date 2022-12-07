import Head from 'next/head';
import { styled } from '@mui/material/styles';
import { Box, Stack } from '@mui/material';

import { ApplicationLayout } from '../components/applicationLayout';
import { TitleBanner } from '../components/titleBanner';
import { MainBanner } from '../components/home/mainBanner';
import { AboutBanner } from '../components/home/aboutBanner';
import { ServiceBannerComponent } from '../components/home/serviceBannerComponent';
import { CompanyBanner } from '../components/home/companyBanner';

import { ServicesList as servicesList } from '../data/servicesList';
import { IndexContent as indexContent } from '../data/indexContent';

// import { Panorama } from '../components/pano';

import ReactPannellum, { getConfig } from "react-pannellum";

const PanoramaRoot = styled(ReactPannellum)(({ theme }) => ({
    '.pnlm-about-msg' : {
        display: 'none !important'
    },
    '.pnlm-load-box' : {
        backgroundColor: 'transparent',
        fontSize: 14
    },
    '.pnlm-panorama-info': {
        // backgroundColor: 'transparent',
        opacity: 0.3
    },
    '.pnlm-compass': {
        
    }
}));

const LogoTileBgStack = styled(Stack)(({ theme }) => ({
    ":before" : {
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

const ApplicationIndex = () => {
    const config = {
        autoRotate: -4,
        autoRotateInactivityDelay: 5000,
        autoLoad: true,
        compass: true,
        northOffset: 215,
        mouseZoom : false,
        keyboardZoom: false,
        doubleClickZoom: true,
        preview: '/static/images/aerial.png',
        uiText: {
            loadingLabel: 'Loading...',
        },
        avoidShowingBackground: true,
        maxPitch: 30,
        hfov: 100.0,
        draggable: true,
        showZoomCtrl: false,
        showFullscreenCtrl: false,
        title: 'Port Coogee, Western Australia'
    };

    return (
    <>
        <Head>
            <title>
                {indexContent.pageTitle}
            </title>
        </Head>
        <Box sx={{minWidth: 700}}>
            <MainBanner/>
            <Stack spacing={0}>
                <AboutBanner />
                {/* <Panorama /> */}

                <Box sx={{
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'center'
                    }}>
                <PanoramaRoot
                    id="2"
                    sceneId="pano-coogee"
                    // imageSource="/static/images/PanoCoogee.jpg"
                    config={config}
                    type='multires'
                    style={{
                        width: "100%",
                        height: "800px",
                        background: "#000000"
                    }}
                    multiRes={{
                        basePath: "/static/images/pano",
                        shtHash: "5T~qIUWVMxWXa|RPoKayf6ofj?j[j[j@xuayaza#fRfQWXWCa#o0ayfkofj[ayayWBjYfRa#js",
                        path: "/%l/%s%y_%x",
                        fallbackPath: "/fallback/%s",
                        extension: "jpg",
                        tileResolution: 512,
                        maxLevel: 5,
                        cubeResolution: 4656
                    }}
                    />
                </Box>

                <TitleBanner title={indexContent.servicesTitle} />
                <LogoTileBgStack spacing={16} sx={{ backdropFilter: 'blur(0)', overflow: 'hidden'}}> {/* For some reason backdropFilter: has to be included for the background to show.... odd */}
                {
                    servicesList.map(element => 
                        <ServiceBannerComponent key={element.title} pdiService={element} />
                    )
                }
                </LogoTileBgStack>
                
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