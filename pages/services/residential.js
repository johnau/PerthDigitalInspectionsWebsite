import Head from 'next/head';
import { Box, Container, Stack, Typography } from '@mui/material';
import { ApplicationLayout } from '../../components/applicationLayout';
import { styled } from '@mui/material/styles';
import { TitleBanner } from '../../components/titleBanner';

import { ResidentialServicesContent as content } from '../../data/residentialServicesContent';

const InterTypography = styled(Typography)(({ theme }) => ({
    fontFamily: "InterLight, sans-serif",
    padding: 4
}));

const GreyBox = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.background.light
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

const ResidentialServices = () => {

    return (
    <>
        <Head>
            <title>
                { 
                    content.pageTitle 
                }
            </title>
        </Head>
        <GreyBox sx={{ display: 'flex', flexDirection: 'column', width: '100%', minWidth: 700, justifyContent: 'center' }}>
            <TitleBanner title={content.title} />
            <Box sx={{maxWidth: 1000, mx: 'auto', py: 4}}>

            </Box>
        </GreyBox>
    </>
)
};

ResidentialServices.getLayout = (page) => (
    <ApplicationLayout>
        {page}
    </ApplicationLayout>
);

export default ResidentialServices;