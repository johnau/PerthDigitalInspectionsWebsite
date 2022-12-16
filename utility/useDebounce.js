// import _ from 'lodash';
// import { useRef, useEffect, useCallback } from 'react';

// const useDebounce = ({ cb, delay }) => {
//     const options = {
//         leading: false,
//         trailing: true
//     };
//     const inputsRef = useRef({ cb, delay }); // mutable ref like with useThrottle
//     const isMounted = useIsMounted();

//     useEffect(() => { inputsRef.current = { cb, delay }; }); //also track cur. delay
//     return useCallback(
//         _.debounce((...args) => {
//             // Debounce is an async callback. Cancel it, if in the meanwhile
//             // (1) component has been unmounted (see isMounted in snippet)
//             // (2) delay has changed
//             if (inputsRef.current.delay === delay)
//                 inputsRef.current.cb(...args);
//         }, delay, options
//         ),
//         [delay, _.debounce]
//     );
// };

// function useIsMounted() {
//     const isMountedRef = useRef(true);
//     useEffect(() => {
//       return () => {
//         isMountedRef.current = false;
//       };
//     }, []);
//     return () => isMountedRef.current;
//   }
  

// export default useDebounce;
