import Head from 'next/head';
import Image from 'next/image';
import { Box, Container, Stack, Typography } from '@mui/material';
import { ApplicationLayout } from '../components/applicationLayout';
import { styled } from '@mui/material/styles';
import { TitleBanner } from '../components/titleBanner';
import { CompanyContent as content } from '../data/companyContent';

const InterTypography = styled(Typography)(({ theme }) => ({
    fontFamily: "InterLight, sans-serif",
    padding: 4
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

const GreyBox = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.background.light
}));

const Company = () => {

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
                <Box sx={{ pb: 2}}>
                    <InterTypography variant="h2">
                        {content.storyTitle}
                    </InterTypography>
                </Box>
                
                <InterTypography variant="body1">
                {
                    content.story
                }
                </InterTypography>
                <Stack direction="column" spacing={2} sx={{pt: 4, justifyContent: 'center'}}>
                {
                    content.owners.map( o => (
                        <Box key={o.id} sx={{ display: 'flex', flex: '0'}}>
                            <Box sx={{ width: 300}}>
                                <Image alt={o.name} width="300" height="300" src="/static/images/profile.jpg" />
                            </Box>
                            <Stack sx={{ flex: '1', px: 4, py: 2}}>
                                <InterTypography variant="body1" textAlign='left' color="neutral.600"><b>{o.name}</b></InterTypography>

                                {
                                    o.qualifications.map( q => (
                                        <InterTypography key={q.id} variant="body1" textAlign='left' color="neutral.600">{q.q}</InterTypography>
                                    ))
                                }
                                
                                <Stack sx={{pt: 2}}>
                                {
                                    o.notes.map( n => (
                                        <InterTypography key={n.id} variant="body1" textAlign='left' color="neutral.600">{n.note}</InterTypography>
                                    ))
                                }    
                                </Stack>                        
                            </Stack>
                        </Box>
                    ))
                }
                </Stack>

                <Box sx={{ pb: 2, pt: 4}}>
                    <InterTypography variant="h2">
                        {content.textsTitle}
                    </InterTypography>
                </Box>
                {
                    content.texts.map( text => (
                        <Box key={text.id} sx={{pt: 2}}>
                            <InterTypography variant="body1">{text.text}</InterTypography>
                        </Box>
                    ))
                }
            </Box>
        </GreyBox>
    </>
)
};

Company.getLayout = (page) => (
    <ApplicationLayout>
        {page}
    </ApplicationLayout>
);

export default Company;