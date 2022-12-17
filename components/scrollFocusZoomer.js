import { Box } from "@mui/material";
import { percInView } from "../utility/isInView";
import { styled } from "@mui/system";
import { useEffect, useState } from "react";
import { useDebouncedEffect } from "../utility/useDebouncedEffect";
// import useDebounce from "../utility/useDebounce";

const ZoomerBox = styled('div')(
    // props => ({ width: props.width * props.animationValue })
    props => ({ width: props.animationValue*100+"%" })
);

const ScrollFocusZoomer  = (props) => {
    const { children, steps, minZoom, offset, height, ...rest } = props;
    const [percShown, ref] = percInView(offset ? offset : 0);
    const [step, setStep] = useState(0);

    !minZoom && (minZoom = 0);

    useDebouncedEffect(() => {
        const stepPerc = (1-minZoom)/steps;
        let zoomStep = 0;
        for (let i = 0; i < steps; i++) {
            if (i === steps-1 && percShown > i*stepPerc) {
                zoomStep = 1;
                break;
            }
            if (percShown > i*stepPerc && percShown <= (i+1)*stepPerc) {
                zoomStep = stepPerc * (i+1);
                break;
            }
        }
        minZoom && ( zoomStep += minZoom );
        if (zoomStep > 1) zoomStep = 1;
        if (zoomStep < 0) zoomStep = 0;
        
        setStep(zoomStep);
    }, [percShown], 20);

    return (
        <Box sx={{display: 'flex', flexDirection:'column', alignItems: 'center', width: '100%', height: height ? height : '100px', overflow: 'hidden'}} ref={ref} {...rest}>
            <ZoomerBox animationValue={step} sx={{display: 'flex', flexDirection:'column', justifyContent: 'center', alignItems: 'center'}} >
                {children}
            </ZoomerBox>
        </Box>
    );

};

export default ScrollFocusZoomer;