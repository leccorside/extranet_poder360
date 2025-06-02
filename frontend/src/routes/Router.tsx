// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import React, { lazy } from 'react';
import { createBrowserRouter, Navigate } from 'react-router';
import Loadable from '../layouts/full/shared/loadable/Loadable';
import ManuaisPage from 'src/views/manuais/ManuaisPage';
import ManualDetalhes from 'src/views/manuais/ManualDetalhes';

/* ***Layouts**** */
const FullLayout = Loadable(lazy(() => import('../layouts/full/FullLayout')));
const BlankLayout = Loadable(lazy(() => import('../layouts/blank/BlankLayout')));

/* ****Pages***** */
const SamplePage = Loadable(lazy(() => import('../views/sample-page/SamplePage')));
const Dashboard = Loadable(lazy(() => import('../views/dashboard/DashboardPage')));
const Manuais = Loadable(lazy(() => import('../views/manuais/ManuaisPage')));
const Error = Loadable(lazy(() => import('../views/authentication/Error')));

const Router = [
  {
    path: '/',
    element: <FullLayout />,
    children: [
      { path: '/', element: <Navigate to="/dashboard" /> },
      { path: '/sample-page', exact: true, element: <SamplePage /> },
      { path: '/dashboard', exact: true, element: <Dashboard /> },
      { path: '/manuais', exact: true, element: <ManuaisPage /> },
      { path: '/manuais/:id', exact: true, element: <ManualDetalhes /> },
      { path: '*', element: <Navigate to="/auth/404" /> },
    ],
  },
  {
    path: '/auth',
    element: <BlankLayout />,
    children: [
      { path: '404', element: <Error /> },
      { path: '*', element: <Navigate to="/auth/404" /> },
    ],
  },
];

const router = createBrowserRouter(Router);
export default router;
