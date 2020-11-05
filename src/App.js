import React from 'react';

import { BrowserRouter } from 'react-router-dom';

import GlobalStyle from './style/GlobalStyle';

import AppProvider from './hooks';
import Routers from './routers'

function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <GlobalStyle />
        <Routers />
      </AppProvider>
    </BrowserRouter>
  );
}

export default App;
