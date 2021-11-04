import { Navigate, useRoutes } from 'react-router-dom';
import { RouteObject } from 'react-router';

// import CompanyView from './CompanyView';
// import CompanyEdit from './CompanyEdit';
import TaskCreate from './components/TaskCreate';
import TaskEdit from './components/TaskEdit';
import TaskList from './components/TaskList';

const routes: RouteObject[] = [
  { path: '/', element: <TaskList /> },
  { path: 'new', element: <TaskCreate /> },
  // { path: ':id', element: <CompanyView /> },
  { path: ':id/edit', element: <TaskEdit /> },
  // { path: '*', element: <Navigate to="/" /> },
];

export default function Companies() {
  return useRoutes(routes);
}
