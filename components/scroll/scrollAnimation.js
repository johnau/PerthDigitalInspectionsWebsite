import { Box } from "@mui/material";
// import { percInView } from "../utility/isInView";
import styled from "@emotion/styled";
import React, { useEffect, useState, useRef } from "react";
// import { useDebouncedEffect } from "../utility/useDebouncedEffect";
import { leavingView, centerRelativeToWindow, leavingViewTopPercent, atHeight, windowPositionNotification, inHeightRange } from "../../utility/isInView";
// import { debounce } from "lodash";

const ANIMATION_TIME = '0.15s';

const OpacityAnimationBox = styled.div(
    props => ({
        opacity: props.animationValue,
        transition: `opacity ${ANIMATION_TIME} ease-in`,
    }),
);
const TextSizeAnimationBox = styled.div(
    props => ({
        '& span, h1, h2': {
            fontSize: props.animationValue,
            transition: `font-size ${ANIMATION_TIME} ease`
        }
    })
);
const StickyBox = styled.div(
    props => ({
        position: props.animationValue,
        top: props.h
    }),
);
const WidthAnimationBox = styled.div(
    props => ({
        width: `${props.animationValue*100}%`,
        transition: `width ${ANIMATION_TIME} ease`,
        margin: 'auto',
        '& div': {
            height: (props.animationValue * props.maxHeight),
            transition: `height ${ANIMATION_TIME} ease`,
            margin: 'auto'
        }
    }),
);


const FocusFade = (props) => {
    const { children, offset, ...rest } = props;
    const [zone, ref] = centerRelativeToWindow(offset);
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
const TopExitFade = ({offset = 0, ...props}) => {
    const { children, ...rest } = props;
    const [perc, ref] = leavingViewTopPercent(offset);
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
const TextZoom = ({ fontSizeLimit = 40, fontSizeRatio = 50, offset = 0, ...props }) => {
    const { children, ...rest } = props;
    const [zone, ref] = centerRelativeToWindow();
    const [fontSize, setFontSize] = useState(10);

    useEffect(() => {
        const fs = Math.round((zone + (offset / 10)) * fontSizeRatio);
        if (fs > fontSizeLimit) {
            fs = fontSizeLimit;
        }
        setFontSize(fs);
    }, [zone, fontSizeLimit, fontSizeRatio, offset]);

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
const StickForAWhile = ({ stickHeight, ...props }) => {
    const { children, stickDuration = 1000, ...rest } = props;
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
const SizeChange2Step = ({ contentHeight, wid1 = 0.3, wid2 = 0.6, wid3 = 1.0, ...props }) => {
    const { children, ...rest } = props;
    const [zone, ref] = centerRelativeToWindow();
    const [wid, setWid] = useState(wid1);

    useEffect(() => {
        if (zone < 0.3) {
            setWid(wid1);
        } else if (zone >= 0.3 && zone < 0.4) {
            setWid(wid2);
        } else if (zone >= 0.4) {
            setWid(wid3);
        }
    }, [zone, wid1, wid2, wid3]);

    return (
        <Box sx={{ display: 'flex', width: '100%', height: contentHeight }}>
            <WidthAnimationBox
                sx={{ display: 'flex', justifyItems: 'center' }}
                animationValue={wid}
                maxHeight={contentHeight}
                ref={ref}
                {...rest}
            >
                {children}
            </WidthAnimationBox>
        </Box>
    );

};




export { FocusFade, TopExitFade, TextZoom, StickForAWhile, SizeChange2Step };

// there will be an array keeping track of all the elements that need to be tracked for inFocus detection
// this array will be passed to the scroll function to check each element scroll height
// when the element is found it needs to be triggered to do its effect (callback?)
// this "class" will need to return a ref that can be stored in the list for checking location
// it will also need to return its jsx component
// it will probably also need to return a state variable that can be used to set the value for the animation
// this animation value could also be ranged by a provided property - so you can set the number of steps of the animation