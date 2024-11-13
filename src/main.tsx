import React from 'react';
import ReactDOM from 'react-dom/client';
import { routes } from './routes/routes';
import {
 createBrowserRouter,
 RouterProvider
} from 'react-router-dom';
import { CssBaseline } from '@mui/material';

const router = createBrowserRouter(routes);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <CssBaseline/>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
