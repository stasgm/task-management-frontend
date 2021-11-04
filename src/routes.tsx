import { Navigate, RouteObject, useRoutes } from 'react-router-dom';

import MainLayout from './components/MainLayout';
import NotFound from './components/NotFound';
import Login from './scenes/Auth/Login';
import Register from './scenes/Auth/Register';
import appRoutes from './scenes/routes';

const Apps = () => {
  return useRoutes(appRoutes());
};

const routes = (isLoggedIn: boolean): RouteObject[] => [
  {
    path: '/',
    element: !isLoggedIn ? <MainLayout /> : <Navigate to={'/app'} />,
    children: [
      { path: '/login', element: <Login /> },
      { path: '/register', element: <Register /> },
      { path: '404', element: <NotFound /> },
      { path: '/', element: <Navigate to={'login'} /> },
      { path: '/admin', element: <Navigate to={'login'} /> },
    ],
  },
  {
    path: '/app/*',
    element: isLoggedIn ? <Apps /> : <Navigate to={'/login'} />,
  },
  { path: '*', element: <NotFound /> },
];

export default routes;
