import ReactPannellum, { getConfig } from "react-pannellum";
import { styled } from '@mui/material/styles';

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

export const PanoramaPannellum = (props) => {

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
        showFullscreenCtrl: true,
        title: 'Port Coogee, Western Australia'
    };

    return (
        <PanoramaRoot
            {...props}
            id="A"
            sceneId="pano-coogee"
            config={config}
            type="multires"
            imageSource=''
            // imageSource='/static/images/hugin.png'
            
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
    );

};