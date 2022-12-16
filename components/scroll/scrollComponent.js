import ReactPannellum, { getConfig } from "react-pannellum";
import { styled } from '@mui/material/styles';
import { Box, Stack } from "@mui/material";
// import loadingImage from '../public/static/images/aerial.png';

import { StickForAWhile, FocusFade, SizeChange2Step } from "./scrollAnimation";
// import { Children } from "react";

const ContentFrame = styled(Box)(({ theme }) => ({
    padding: 20,
    width: 2000,
    height: 400
}));

const StickFadeZoom = (props) => {
    const fadeOffset = 4;
    const stickHeight = 300;

    // when this is remade as a content wrapper component, the Box at the bottom 800 high value needs to be tied directly to the height of the parent.... somehow...
    return (
        <StickForAWhile stickHeight={stickHeight}>
            <FocusFade offset={fadeOffset}>
                {/* <WidthChange2Step> */}
                <ContentFrame>
                    <Box sx={{ position: "relative", width: "100%", height: 1500 }}>
                        <Box sx={{ position: 'absolute', top: 400, width: '100%', justifyContent: 'center' }}>
                            {props.children}
                        </Box>
                    </Box>
                </ContentFrame>
                {/* </WidthChange2Step> */}
            </FocusFade>
            <Box sx={{ height: 2000 }} />
        </StickForAWhile>
    );

};

export {
    StickFadeZoom,

};