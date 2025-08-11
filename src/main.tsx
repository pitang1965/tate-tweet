import React from 'react';
import { createRoot } from 'react-dom/client';
import { MantineProvider } from '@mantine/core';
import App from './App';

const root = createRoot(document.getElementById('root')!);

root.render(
  <React.StrictMode>
    <MantineProvider
      defaultColorScheme="light"
      theme={{
        fontFamily:
          '-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif',
      }}
    >
      <App />
    </MantineProvider>
  </React.StrictMode>
);
