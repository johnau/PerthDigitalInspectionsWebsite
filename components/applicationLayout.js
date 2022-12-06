import { useState, useEffect } from 'react';
import { Box, Container } from '@mui/material';
import { styled } from '@mui/material/styles';
import { ApplicationTopBar } from './applicationTopBar';
import RequestQuoteFab from './requestQuoteFab';
import { Footer } from './footer';

const ApplicationLayoutRoot = styled('div')(({ theme }) => ({
    display: 'flex',
    flex: '1 1 auto',
    flexDirection: 'column',
    width: '100%',
    minHeight: '100vh',
    paddingTop: 64,
}));

export const ApplicationLayout = (props) => {
    const { children } = props;

    const [resizeState, setResizeState] = useState({
        mobileView: false,
    });
    const [scrollState, setScrollState] = useState({
        bottom: 1000
    });
    
    const { mobileView } = resizeState;

    useEffect(() => {
        const procResizeState = () => {
            return window.innerWidth < 1080
                ? setResizeState((prevState) => ({ ...prevState, mobileView: true }))
                : setResizeState((prevState) => ({ ...prevState, mobileView: false }));
        };
        const procScrollState = () => {
            return window.outerHeight - window.scrollY
        };

        procResizeState();
        window.addEventListener("resize", () => procResizeState());

        return () => {
            window.removeEventListener("resize", () => procResizeState());
        }
    }, []);

    return (
        <>
            <ApplicationLayoutRoot>
                <Box sx={{
                    flex: '1',
                    flexGrow: 'stretch',
                    // flexDirection: 'column',
                    width: '100%',
                    height: '100%',
                    mt: '56px',
                }}
                >
                    {children}
                </Box>
                <Footer sx={{ mt: 'auto', flex: 1}} />
            </ApplicationLayoutRoot>
            <RequestQuoteFab/>    
            <ApplicationTopBar mobileView={mobileView} />
        </>
    );
};
