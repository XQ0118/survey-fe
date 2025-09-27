import '@mantine/core/styles.css';

import { createTheme, MantineProvider } from '@mantine/core';
import { router } from './main';
import { RouterProvider } from '@tanstack/react-router';


const theme = createTheme({
  breakpoints: {
    xs: '30em',
    sm: '48em',
    md: '64em',
    lg: '74em',
    xl: '90em',
  },
});

function App() {

  return (
    <>
      <MantineProvider theme={theme}>
        <RouterProvider router={router} />
      </MantineProvider>
    </>
  )
}

export default App
