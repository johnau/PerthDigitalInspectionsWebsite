// Default _app.js contents:


// import '../styles/globals.css'

// function MyApp({ Component, pageProps }) {
//   return <Component {...pageProps} />
// }

// export default MyApp

// _app.js with emotion cache (but not prop types)

// import React from 'react';
// import { CacheProvider } from '@emotion/react';
// import { ThemeProvider, CssBaseline } from '@mui/material';

// import createEmotionCache from '../utility/createEmotionCache';
// import lightTheme from '../styles/theme/lightTheme';
// import '../styles/globals.css';

// const clientSideEmotionCache = createEmotionCache();

// const MyApp = (props) => {
//   const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

//   return (
//     <CacheProvider value={emotionCache}>
//       <ThemeProvider theme={lightTheme}>
//         <CssBaseline />
//         <Component {...pageProps} />
//       </ThemeProvider>
//     </CacheProvider>
//   );
// };

// export default MyApp;

// _app.js with emotion cache and prop-types

import React from 'react';
import PropTypes from 'prop-types';
import { CacheProvider } from '@emotion/react';
import { ThemeProvider, CssBaseline } from '@mui/material';

import createEmotionCache from '../utility/createEmotionCache';
import mainTheme from '../styles/theme/mainTheme';
import '../styles/globals.css';

import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

const clientSideEmotionCache = createEmotionCache();

const MyApp = (props) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={mainTheme}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <CssBaseline />
          {getLayout(<Component {...pageProps} />)}
          {/* <Component {...pageProps} /> */}
        </LocalizationProvider>
      </ThemeProvider>
    </CacheProvider>
  );
};

export default MyApp;

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  emotionCache: PropTypes.object,
  pageProps: PropTypes.object.isRequired,
};