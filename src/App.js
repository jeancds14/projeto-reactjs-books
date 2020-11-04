import React from 'react';

import { BrowserRouter } from 'react-router-dom';

import AppProvider from './hooks';
import Routers from './routers'

function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <Routers />
      </AppProvider>
    </BrowserRouter>
  );
}

export default App;
