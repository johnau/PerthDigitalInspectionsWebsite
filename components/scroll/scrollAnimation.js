import { Box } from "@mui/material";
// import { percInView } from "../utility/isInView";
import styled from "@emotion/styled";
import React, { useEffect, useState, useRef } from "react";
// import { useDebouncedEffect } from "../utility/useDebouncedEffect";
import { leavingView, relativeToWindowCenter, leavingViewTopPercent, atHeight, windowPositionNotification, inHeightRange } from "../../utility/isInView";


const OpacityAnimationBox = styled.div(
    props => ({ opacity: props.animationValue }),
);

const TextSizeAnimationBox = styled.div(
    props => ({ 
        '& span, h1, h2': { 
            fontSize: props.animationValue 
        }
    })
);

const StickyBox = styled.div(
    props => ({ position: props.animationValue,
                top: props.h,
            }),
);

const FocusFade = (props) => {
    const {children, offset, ...rest} = props;
    const [zone, ref] = relativeToWindowCenter(offset);
    return (
        <>
            <OpacityAnimationBox 
                sx={{ display: 'flex', justifyItems: 'center' }}
                animationValue={zone} 
                ref={ref} 
                {...rest}
            >
                {children}
            </OpacityAnimationBox>
        </>
    );
};

const TopExitFade = (props) => {
    const {children, ...rest} = props;
    const [perc, ref] = leavingViewTopPercent();
    return (
        <OpacityAnimationBox 
            sx={{ display: 'flex', justifyItems: 'center' }}
            animationValue={perc}
            ref={ref} 
            {...rest}
            >
            {children}
        </OpacityAnimationBox>
    );
};

const TextZoom = (props) => {
    const {children, fontSizeLimit = 40, fontSizeRatio = 50, offset = 0, ...rest} = props;
    const [zone, ref] = relativeToWindowCenter();
    const [fontSize, setFontSize] = useState(10);
    useEffect(() => {
        const fs = Math.round((zone+(offset/10))*fontSizeRatio);
        if (fs > fontSizeLimit) {
            fs = fontSizeLimit;
        }
        setFontSize(fs);
    }, [zone]);

    return (
        <TextSizeAnimationBox 
            sx={{ display: 'flex', justifyItems: 'center' }}
            animationValue={fontSize} 
            ref={ref} 
            {...rest}
            >
            {children}
        </TextSizeAnimationBox>
    );
};

const StickForAWhile = ({stickHeight, ...props}) => {
    const {children, stickDuration = 1000, ...rest} = props;
    const [atHgt, ref] = inHeightRange(stickHeight, 0, 50);

    return (
        <StickyBox
            sx={{ display: 'flex', justifyItems: 'center' }}
            animationValue={atHgt ? 'sticky' : 'relative'} 
            h={stickHeight}
            ref={ref} 
            {...rest}
            >
            {children}
        </StickyBox>
    )
};

export {FocusFade, TopExitFade, TextZoom, StickForAWhile};

// there will be an array keeping track of all the elements that need to be tracked for inFocus detection
// this array will be passed to the scroll function to check each element scroll height
// when the element is found it needs to be triggered to do its effect (callback?)
// this "class" will need to return a ref that can be stored in the list for checking location
// it will also need to return its jsx component
// it will probably also need to return a state variable that can be used to set the value for the animation
// this animation value could also be ranged by a provided property - so you can set the number of steps of the animation