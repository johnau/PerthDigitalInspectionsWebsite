import { useState, useEffect, useLayoutEffect, useRef, useMemo } from 'react';
import { Box, Container } from '@mui/material';
import { styled } from '@mui/material/styles';
import { ApplicationTopBar } from './applicationTopBar';
import { RequestQuoteFab } from './requestQuoteFab';
import { Footer } from './footer';

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

const useVisibility = (offset = 0) => {
    const [isVisible, setIsVisible] = useState(false);
    const currentElement = useRef(null);
  
    const onScroll = () => {
      if (!currentElement.current) {
        setIsVisible(false);
        return;
      }
      const top = currentElement.current.getBoundingClientRect().top;
      setIsVisible(top + offset >= 0 && top - offset <= window.innerHeight);
    }
  
    useEffect(() => {
      document.addEventListener('scroll', onScroll, true);
      return () => document.removeEventListener('scroll', onScroll, true);
    })
  
    return [isVisible, currentElement];
}

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

    

    const [beforeCheckoutSubmitShown, beforeCheckoutSubmitRef] = useVisibility();
    const [rqFabBuffer, setRqFabBuffer] = useState(0);

    const onScroll = () => {
        let buffer = window.innerHeight - beforeCheckoutSubmitRef.current.getBoundingClientRect().top;
        if (buffer > 0) {
            setRqFabBuffer(buffer);
        } else {
            setRqFabBuffer(0);
        }
    };

    useEffect(() => {
        document.addEventListener('scroll', onScroll, true);
        return () => document.removeEventListener('scroll', onScroll, true);
    });

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
                <Box ref={beforeCheckoutSubmitRef} sx={{ display: 'flex', justifyContent: 'center'}}>
                    <RequestQuoteFab pagePos={beforeCheckoutSubmitShown ? 'in-page' : 'floating'} />  
                </Box>
                <Box sx={{backgroundColor: "background.dark"}}>
                    <Footer />
                </Box>
            </ApplicationLayoutRoot>
        
            
            <ApplicationTopBar mobileView={mobileView} />
        </>
    );
};
