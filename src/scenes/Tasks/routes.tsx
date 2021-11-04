import { Navigate, useRoutes } from 'react-router-dom';
import { RouteObject } from 'react-router';

import TaskCreate from './components/TaskCreate';
import TaskEdit from './components/TaskEdit';
import TaskList from './components/TaskList';

const routes: RouteObject[] = [
  { path: '/', element: <TaskList /> },
  { path: '/new', element: <TaskCreate />, index: true },
  { path: ':id', element: <TaskCreate /> },
  // { path: '*', element: <Navigate to="/" /> },
];

export default function Companies() {
  return useRoutes(routes);
}
