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
        autoRotate: -2,
        autoRotateInactivityDelay: 5000,
        autoLoad: true,
        compass: true,
        mouseZoom : false,
        
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
                <ReactPannellum
                    id="1"
                    sceneId="pano-coogee"
                    imageSource="/static/images/PanoCoogee.jpg"
                    config={config}
                    style={{
                        width: "100%",
                        height: "400px",
                        background: "#000000"
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