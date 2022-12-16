import { FormControlUnstyledContext } from "@mui/base";
import { useRef, useState, useEffect } from "react";
import { useDebouncedEffect } from "./useDebouncedEffect";

const isInView = (offset = 0) => {
    const [isVisible, setIsVisible] = useState(false);
    const el = useRef(null);

    const onScroll = () => {
        if (!el.current) {
            setIsVisible(false);
            return;
        }
        const top = el.current.getBoundingClientRect().top;
        setIsVisible(top + offset >= 0 && top - offset <= window.innerHeight);
    };

    useDebouncedEffect(() => {
        document.addEventListener('scroll', onScroll, true);
        return () => document.removeEventListener('scroll', onScroll, true);
    }, [], 50);

    return [isVisible, el];
};

const percInView = (offset = 0) => {
    const [percVisible, setPercVisible] = useState(0.0);
    const el = useRef(null);

    const onScroll = () => {
        if (!el.current) {
            setPercVisible(0);
            return;
        }
        const top = el.current.getBoundingClientRect().top;
        const height = el.current.offsetHeight;

        const bottom = top + height;
        let percVis = (window.innerHeight - top) / height + offset;
        if (percVis > 1) {
            let percVisOut = bottom / height;
            if (percVisOut < 1) percVis = percVisOut + offset;
        }

        if (percVis > 1) percVis = 1;
        if (percVis < 0) percVis = 0;
        setPercVisible(percVis);
    };

    useDebouncedEffect(() => {
        document.addEventListener('scroll', onScroll, true);
        return () => document.removeEventListener('scroll', onScroll, true);
    }, [], 50);

    return [percVisible, el];
};

const relativeToWindowCenter = (offset = 0, debounce = 50, zoneWidth = 0.1) => {
    const el = useRef(null);
    const [zone, setZone] = useState(0.0); // max value 1.0

    const onScroll = () => {
        if (!el.current) {
            setZone(0.0);
            return;
        }
        const top = el.current.getBoundingClientRect().top;
        const height = el.current.offsetHeight;
        const middle = window.innerHeight - (top + (height / 2));
        const zones = 1 / zoneWidth;

        for (let i = 0; i < zones; i++) {
            const st = zoneWidth * i * window.innerHeight;
            const en = zoneWidth * (i + 1) * window.innerHeight;
            const inz = middle > st && middle <= en;
            if (inz) {
                const zon = i+offset;
                const value = zon/zones;
                if (value > 1.0) value = 1.0;
                if (value < 0.0) value = 0.0;
                setZone(value);
                break;
            }
        }
    };

    useDebouncedEffect(() => {
        document.addEventListener('scroll', onScroll, true);
        return () => document.removeEventListener('scroll', onScroll, true);
    }, [], debounce);

    return [zone, el];
};

const leavingView = (offset = 0, debounce = 50) => {
    const el = useRef(null);
    const [leaving, setLeaving] = useState(false);

    const onScroll = () => {
        if (!el.current) {
            setLeaving(true);
            return;
        }
        const top = el.current.getBoundingClientRect().top;
        const height = el.current.offsetHeight;
        const bottom = top + height;
        if (bottom <= 200) {
            setLeaving(true);
            return;
        }
        setLeaving(false);
    };

    useDebouncedEffect(() => {
        document.addEventListener('scroll', onScroll, true);
        return () => document.removeEventListener('scroll', onScroll, true);
    }, [], debounce);

    return [leaving, el];
};

const leavingViewTopPercent = (offset = 0, debounce = 50) => {
    const el = useRef(null);
    const [percLeaving, setPercLeaving] = useState(1.0);

    const onScroll = () => {
        if (!el.current) {
            setPercLeaving(0.0);
            return;
        }
        const top = el.current.getBoundingClientRect().top;
        const height = el.current.offsetHeight;
        const bottom = top + height;
        const perc = bottom / height;
        if (perc < 0) perc = 0.0;
        if (perc > 1) perc = 1.0;
        setPercLeaving(perc);
    };

    useDebouncedEffect(() => {
        document.addEventListener('scroll', onScroll, true);
        return () => document.removeEventListener('scroll', onScroll, true);
    }, [], debounce);

    return [percLeaving, el];
};

const atHeight = (h = 100, offset = 0, debounce = 50) => {
    const el = useRef(null);
    const [imThere, setImThere] = useState(false);

    const onScroll = () => {
        if (!el.current) {
            setImThere(false);
            return;
        }
        const top = el.current.getBoundingClientRect().top;
        if (top === h) {
            setImThere(true);
            return;
        } else if (top < h) {
            setImThere(true);
            return;
        }
        setImThere(false);
    };

    useDebouncedEffect(() => {
        document.addEventListener('scroll', onScroll, true);
        return () => document.removeEventListener('scroll', onScroll, true);
    }, [], debounce);

    return [imThere, el];
};

const inHeightRange = (h = 100, length = 200, offset = 0, debounce = 50) => {
    const el = useRef(null);
    const [imThere, setImThere] = useState(false);

    const onScroll = () => {
        if (!el.current) {
            setImThere(false);
            return;
        }
        const top = el.current.getBoundingClientRect().top;
        if (top === h || top < h) {
            setImThere(true);
            return;
        }
        setImThere(false);
    };

    useDebouncedEffect(() => {
        document.addEventListener('scroll', onScroll, true);
        return () => document.removeEventListener('scroll', onScroll, true);
    }, [], debounce);

    return [imThere, el];
};

const windowPositionNotification = (h = 0, debounce = 50) => {
    const [imThere, setImThere] = useState(false);

    const onScroll = () => {
        const winTop = window.scrollY;
        console.log("WinTop: ", winTop, h);
        if (winTop > h) {
            setImThere(true);
            return;
        } 
        setImThere(false);
    };

    useDebouncedEffect(() => {
        document.addEventListener('scroll', onScroll, true);
        return () => document.removeEventListener('scroll', onScroll, true);
    }, [], debounce);

    return imThere;
};

// const elementsPercentInView = (offset = 0, elements) => {
//     const [els, setEls] = useState([]);
//     const itemEls = useRef({});
//     const populate = () => {
//         for (let i = 0; i < elements.length; i++) {
//             const e = elements[i];
//             setEls(oldArray => [...oldArray, {id: i, ref: r, perVis: 0}]);
//         }
//     };
//     useEffect(() => {
//         populate();
//     }, [elements]);

//     const checkPercentVisible = (item) => {
//         if (!item.ref.current) {
//             return 0;
//         }
//         const top = item.current.getBoundingClientRect().top;
//         const height = item.current.offsetHeight;

//         let percVis = (window.innerHeight - top)/height;
//         if (percVis > 1) percVis = 1;
//         if (percVis < 0) percVis = 0;

//         return percVis;
//     };

//     const onScroll = () => {
//         els.forEach( item => {
//             const perVis = checkPercentVisible(item);
//             for (const el of els) {
//                 if (el.id === item.id && el.perVis !== perVis) {
//                     el.perVis = perVis;
//                     break;
//                 }
//             }
//         });
//     };

//     useDebouncedEffect(() => {
//         document.addEventListener('scroll', onScroll, true);
//         return () => document.removeEventListener('scroll', onScroll, true);
//     }, [], 50);

//     return els;
// };

export {
    isInView,
    percInView,
    relativeToWindowCenter,
    leavingView,
    leavingViewTopPercent,
    atHeight,
    inHeightRange,
    windowPositionNotification
    // elementsPercentInView
};