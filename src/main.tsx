import React from 'react';
import ReactDOM from 'react-dom';
import { MantineProvider, Global } from '@mantine/core';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <MantineProvider
      theme={{
        colorScheme: 'light',
        fontFamily:
          '-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif',
      }}
    >
      <Global
        styles={(theme) => ({
          body: {
            margin: 0,
          },
        })}
      />
      <App />
    </MantineProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
