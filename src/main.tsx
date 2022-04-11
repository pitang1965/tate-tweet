import React from 'react';
import ReactDOM from 'react-dom';
import { MantineProvider } from '@mantine/core';
import './index.css';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <MantineProvider
      theme={{
        colorScheme: 'dark',
        fontFamily:
          '-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif',
      }}
    >
      <App />
    </MantineProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
