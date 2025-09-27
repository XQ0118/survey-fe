import '@mantine/core/styles.css';

import { MantineProvider } from '@mantine/core';
import { router } from './main';
import { RouterProvider } from '@tanstack/react-router';

function App() {

  return (
    <>
      <MantineProvider>
        <RouterProvider router={router} />
      </MantineProvider>
    </>
  )
}

export default App
