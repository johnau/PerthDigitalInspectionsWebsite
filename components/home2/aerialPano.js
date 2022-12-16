import NextLink from 'next/link';
import { Box, Button, Card, CardActions, CardMedia, CardContent, Container, Divider, Link, Paper, Stack,  Typography } from "@mui/material";
import Slide from '@mui/material/Slide';
import * as React from 'react';
import { styled } from '@mui/material/styles';
import { useState } from "react";
import Carousel from "react-material-ui-carousel";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Image from "next/image";

const PaperBox = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
    width: '100%',
    height: '1000px',
    overflow: 'hidden'
}));

const LightTypography = styled(Typography)(({ theme }) => ({
    fontFamily: "InterLight, sans-serif",
}));

const SemiBoldTypography = styled(Typography)(({ theme }) => ({
    fontFamily: "InterSemiBold, sans-serif",
}));

const CoverImage = styled(Image)(({ theme }) => ({
    objectFit: 'cover'
}));

// This component will display panos while the user scrolls through it, each pano will have a link to view in pannellum
export const AerialPano = (props) => {

    const [panoIndex, setPanoIndex] = useState(1);
    
    const panos = [
        { id: 1, previewImage: "/static/images/aerialpano/01_preview.jpg", panoLink: "" },
        // { id: 2, previewImage: "/static/images/aerialpano/02_preview.jpg", panoLink: "" },
    ];

    return (
    <PaperBox>
        
        {
            panos.map( pano => {

                return (
                    <Box sx={{width: '100%'}} key={pano.id}>
                        {/* <Slide direction="up" in={pano.id === panoIndex} mountOnEnter unmountOnExit> */}
                            <CoverImage src={pano.previewImage} width='2000px' height='1000px' />
                        {/* </Slide> */}
                    </Box>
                )
            })
        }
        <CoverImage src="" />
    </PaperBox>
    );

};

