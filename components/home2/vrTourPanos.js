import ReactPannellum, { getConfig } from "react-pannellum";
import { styled } from '@mui/material/styles';
import { Box, Stack } from "@mui/material";
// import loadingImage from '../public/static/images/aerial.png';

import { StickForAWhile, FocusFade } from "../scroll/scrollAnimation";

const PanoramaRoot = styled(ReactPannellum)(({ theme }) => ({
    '.pnlm-about-msg': {
        display: 'none !important'
    },
    '.pnlm-load-box': {
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

const ContentFrame = styled(Box)(({ theme }) => ({
    padding: 20,
}));

export const VrTourPanos = (props) => {

    const config = {
        autoRotate: -4,
        autoRotateInactivityDelay: 0,
        autoLoad: true,
        compass: false,
        northOffset: 215,
        mouseZoom: false,
        keyboardZoom: false,
        doubleClickZoom: true,
        preview: '/static/images/aerial.png',
        uiText: {
            loadingLabel: 'Loading...',
        },
        avoidShowingBackground: true,
        // maxPitch: 30,
        hfov: 100.0,
        draggable: false,
        showZoomCtrl: false,
        showFullscreenCtrl: false,
        // title: ''
    };

    const style = {
        width: "400px",
        height: "400px",
        background: "#000000"
    };

    const fadeOffset = 4;

    const stickHeight = 450;

    const Section = () => (
        <StickForAWhile stickHeight={stickHeight}>
            <FocusFade offset={fadeOffset}>
                <ContentFrame>
                   
                </ContentFrame>
            </FocusFade>
            <Box sx={{ height: 500 }} />
        </StickForAWhile>
    );
    // when this is remade as a content wrapper component, the Box at the bottom 800 high value needs to be tied directly to the height of the parent.... somehow...

    return (
        <Stack direction="column" spacing={2} sx={{ width: '100%', alignItems: 'center' }}>
            <StickForAWhile stickHeight={stickHeight}>
                <FocusFade offset={fadeOffset}>
                    <ContentFrame>
                        <PanoramaRoot
                            {...props}
                            id="a"
                            sceneId="entry"
                            config={config}
                            type="multires"
                            imageSource=''
                            style={style}
                            multiRes={{
                                basePath: "/static/images/tour-pano/cornwall_entry",
                                shtHash: "5+~WozaeaLofWrkCWCf6ayWWj[j[jsaxoeayaybHj[axW:aejYj]WCkBfPj@a#ayfPj[ayj[f5",
                                path: "/%l/%s%y_%x",
                                fallbackPath: "/fallback/%s",
                                extension: "jpg",
                                tileResolution: 512,
                                maxLevel: 4,
                                cubeResolution: 2544
                            }}
                        />
                    </ContentFrame>
                </FocusFade>
                <Box sx={{ height: 500 }} />
            </StickForAWhile>
            <StickForAWhile stickHeight={stickHeight}>
                <FocusFade offset={fadeOffset}>
                    <ContentFrame>
                        <PanoramaRoot
                            {...props}
                            id="b"
                            sceneId="living"
                            config={config}
                            type="multires"
                            imageSource=''
                            style={style}
                            multiRes={{
                                basePath: "/static/images/tour-pano/cornwall_living",
                                shtHash: "5-~po#axniaykCWVj]aej[fkj[bIaeWBj[f6jsj]kCafbHj[j]aeayaefkjZj[a#fkj[jtj[j[",
                                path: "/%l/%s%y_%x",
                                fallbackPath: "/fallback/%s",
                                extension: "jpg",
                                tileResolution: 512,
                                maxLevel: 4,
                                cubeResolution: 2544
                            }}
                        />
                    </ContentFrame>
                </FocusFade>
                <Box sx={{ height: 500 }} />
            </StickForAWhile>
            <StickForAWhile stickHeight={stickHeight}>
                <FocusFade offset={fadeOffset}>
                    <ContentFrame>
                        <PanoramaRoot
                            {...props}
                            id="c"
                            sceneId="upstairs"
                            config={config}
                            type="multires"
                            imageSource=''
                            style={style}
                            multiRes={{
                                basePath: "/static/images/tour-pano/cornwall_upstairs",
                                shtHash: "5+~WkBjYjYazV@fkbIj[a}azayj@j[j[j[j[ayf6fPfioeaybca#jsk8f7jZaekCjsfka#axoL",
                                path: "/%l/%s%y_%x",
                                fallbackPath: "/fallback/%s",
                                extension: "jpg",
                                tileResolution: 512,
                                maxLevel: 4,
                                cubeResolution: 2544
                            }}
                        />
                    </ContentFrame>
                </FocusFade>
                <Box sx={{ height: 500 }} />
            </StickForAWhile>
            <Box sx={{ height: 800 }} /> 
        </Stack>
    );

};