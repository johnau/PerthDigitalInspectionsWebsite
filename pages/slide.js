// import Head from 'next/head';
// import { useState } from 'react';
// import { styled } from '@mui/material/styles';
// import { Box, Slide, Stack } from '@mui/material';
// import Image from 'next/image';

// const CoverImage = styled(Image)(({ theme }) => ({
//     objectFit: 'cover'
// }));

// const SlideTest = () => {
//     const [panoIndex, setPanoIndex] = useState(1);
    
//     const panos = [
//         { id: 1, previewImage: "/static/images/aerialpano/01_preview.jpg", panoLink: "" },
//         { id: 2, previewImage: "/static/images/aerialpano/02_preview.jpg", panoLink: "" },
//     ];

//     return (
//     <>
//         <Head>
//             <title>
//             </title>
//         </Head>
//         <Box sx={{minWidth: 700}}>
//         {
//             panos.map( pano => {

//                 return (
//                     <Box sx={{width: '1000px', height: '100px'}}>
//                         <Slide direction="up" in={pano.id === panoIndex} mountOnEnter unmountOnExit>
//                             <CoverImage src={pano.previewImage} width='4000px' height='1000px' />
//                         </Slide>
//                     </Box>
//                 )
//             })
//         }
//         </Box>
//     </>
// )
// };

// // SlideTest.getLayout = (page) => (
// //     <ApplicationLayout>
// //         {page}
// //     </ApplicationLayout>
// // );

// export default SlideTest;

import * as React from 'react';
import Box from '@mui/material/Box';
import Switch from '@mui/material/Switch';
import Paper from '@mui/material/Paper';
import Slide from '@mui/material/Slide';
import { Stack } from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Theme } from '@mui/material/styles';
import { ApplicationLayout } from '../components/applicationLayout';
import { styled } from '@mui/material/styles';
import Image from 'next/image';

const CoverImage = styled(Image)(({ theme }) => ({
    objectFit: 'cover'
}));

const PanoImg = (pano) => (
    <Box sx={{ width: 1000, height: 100}} >
        <CoverImage src={pano.previewImage} layout='fill' />
    </Box>
);

const SlideTest = () => {
  const [checked, setChecked] = React.useState(false);
  const containerRef = React.useRef(null);

    const panos = [
        { id: 1, previewImage: "/static/images/aerialpano/01_preview.jpg", panoLink: "" },
        { id: 2, previewImage: "/static/images/aerialpano/02_preview.jpg", panoLink: "" },
    ];

  const handleChange = () => {
    setChecked((prev) => !prev);
  };

  return (
    <Box
      sx={{
        width: "100%",
        display: 'flex',
        flexDirection: 'column',
        padding: 0,
        bgcolor: '#555',
        overflow: 'hidden',
      }}
      ref={containerRef}
    >
        <Box sx={{bgcolor: '#000', width: '100%', height: '1600px'}} />
        <Stack direction="column" sx={{width: '100%'}}>
            <Box sx={{ width: 200 }}>
                <FormControlLabel
                control={<Switch checked={checked} onChange={handleChange} />}
                label="Show from target"
                />
            </Box>
            <Slide direction="up" in={checked} container={containerRef.current} display="flex">
                <Box sx={{ display: 'flex', position: 'relative', width: "100%", height: 600}} >
                    <CoverImage src={panos[0].previewImage} layout='fill' />
                </Box>
            </Slide>
        </Stack>
    </Box>
  );
};

SlideTest.getLayout = (page) => (
    <ApplicationLayout>
        {page}
    </ApplicationLayout>
);

export default SlideTest;

