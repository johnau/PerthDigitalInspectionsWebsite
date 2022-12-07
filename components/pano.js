// import React, { useRef, useEffect } from "react";
// import { pannellum } from "../utility/pannellum";
// import { styled } from '@mui/material/styles';

// const PanoramaRoot = styled('div')(({ theme }) => ({
//     display: 'flex',
//     flexGrow: 1,
//     width: '100%',
//     minHeight: '50em',

//     '.pnlm-about-msg' : {
//         display: 'none !important'
//     },

//     '.pnlm-load-box' : {
//         display: 'none !important'
//     }
// }));


// export const Panorama = (props) => {
//   // Pannellum needs an ID to mount to so we need to generate a unique one for
//   // each instance
//   const { current: id } = useRef(
//     `panorama-${Math.floor(Math.random() * (99999 - 10000 + 1)) + 10000}`
//   );
//   const viewer = useRef(null);

//   useEffect(() => {
//     viewer.current = pannellum.viewer(id, {
//       autoLoad: true,
//       panorama: "/static/images/PanoCoogee.jpg",
//       dynamicUpdate: true,
//       compass: true,
//       friction: 1,
//       mouseZoom: false,
//       showZoomCtrl: true,
//       showFullscreenCtrl: false,
//       type: "equirectangular"
//     });

//     return () => {
//       viewer.current.destroy();
//     };
//   }, [id]);

//   return <PanoramaRoot {...props} id={id} />;
// };
