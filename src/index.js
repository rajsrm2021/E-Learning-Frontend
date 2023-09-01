import { ColorModeScript } from '@chakra-ui/react';
import React, { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import App from './App';
import { Provider as ReduxProvider } from 'react-redux';
import store from './redux/store';

import { ChakraBaseProvider, theme } from '@chakra-ui/react';
const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);

root.render(
  <StrictMode>
    <ReduxProvider store={store}>
      <ChakraBaseProvider theme={theme}>
        <ColorModeScript />
        <App />
      </ChakraBaseProvider>
    </ReduxProvider>
  </StrictMode>
);
