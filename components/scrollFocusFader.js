import { Box } from "@mui/material";
import { percInView } from "../utility/isInView";
import { styled } from "@mui/material/styles";
import { useEffect, useState } from "react";
import { useDebouncedEffect } from "../utility/useDebouncedEffect";


const AnimatedBox = styled('div')(
    props => ({ opacity: props.animationValue })
);

const ScrollFocusFader = (props) => {
    const { children, steps, offset, ...rest } = props;
    const [percShown, ref] = percInView(offset ? offset : 0);
    const [step, setStep] = useState(0);
    
    useDebouncedEffect(() => {
        const stepPerc = 1/steps;
        let opacityStep = 0;
        for (let i = 0; i < steps; i++) {
            if (percShown > i*stepPerc && percShown <= (i+1)*stepPerc ) {
                opacityStep = stepPerc * (i+1);
                break;
            }
            if (i === steps-1 && percShown > i*stepPerc) {
                opacityStep = 1;
            }
        }
        setStep(opacityStep);
    }, [percShown], 20);

    return (
        <>
            <AnimatedBox 
                sx={{ display: 'flex', justifyItems: 'center' }}
                animationValue={step} 
                ref={ref} 
                {...rest}
            >
                {children}
            </AnimatedBox>
        </>
    );

};

export default ScrollFocusFader;