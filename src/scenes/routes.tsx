import { Navigate, RouteObject } from 'react-router-dom';

import MainLayout from '../components/MainLayout';
import NotFound from '../components/NotFound';

import Tasks from './Tasks';

const routes = (): RouteObject[] => [
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: '/', element: <Navigate to={'/app/tasks'} />, index: true },
      { path: '/tasks/*', element: <Tasks />, index: true },
      { path: '*', element: <NotFound /> },
    ],
  },
];

export default routes;
