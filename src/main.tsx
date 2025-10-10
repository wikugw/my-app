import { ChakraProvider, defaultSystem } from '@chakra-ui/react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import App from './App.tsx';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { store } from './store/index.ts';
import { Provider } from 'react-redux';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <ChakraProvider value={defaultSystem}>
        <QueryClientProvider client={queryClient}>
          <Provider store={store}>
            <App />
          </Provider>
        </QueryClientProvider>
      </ChakraProvider>
    </BrowserRouter>
  </StrictMode>
);
