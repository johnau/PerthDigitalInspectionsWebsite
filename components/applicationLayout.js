import { useState, useEffect, useRef, useMemo } from 'react';
import { Box, Container } from '@mui/material';
import { styled } from '@mui/material/styles';
import { ApplicationTopBar } from './applicationTopBar';
import { RequestQuoteFab } from './requestQuoteFab';
import { Footer } from './footer';
import { isInView } from '../utility/isInView';
import Properties from '../properties';

const ApplicationLayoutRoot = styled('div')(({ theme }) => ({
    // display: 'flex',
    // display: '-webkit-box',
    // display: '-moz-box',
    // display: '-ms-flexbox',
    // display: '-webkit-flex',
    // flexDirection: 'column',
    // justifyContent: 'center',
    // alignItems: 'center',
    // width: '100vw',
    // minHeight: '100vh',
    paddingTop: 120,
    width: '100%'
}));

export const ApplicationLayout = (props) => {
    const { children } = props;


    const [scrollState, setScrollState] = useState({
        bottom: 1000
    });
    
    // const { mobileView } = resizeState;

    const [quoteFabHomeShown, quoteFabHomeRef] = isInView();

    // this code is duplicated elsewhere....
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
        return () => {
            window.removeEventListener("resize", () => procResizeState());
        }
    }, []);

    return (
        <>
            <ApplicationLayoutRoot
                sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    flexDirection: 'column',
                    minHeight: '100vh'
                }}>
                <Box sx={{
                    flexGrow: 1,
                    width: '100%',
                    minHeight: 850
                }}>
                    {children}
                </Box>
                <Box ref={quoteFabHomeRef} sx={{ display: 'flex', justifyContent: 'center', height: 140}}>
                    <RequestQuoteFab pagePos={quoteFabHomeShown ? 'in-page' : 'floating'} />  
                </Box>
                <Box sx={{backgroundColor: "background.dark"}}>
                    <Footer />
                </Box>
            </ApplicationLayoutRoot>
                    
            <ApplicationTopBar mobileView={resizeState.mobileView} />
        </>
    );
};
