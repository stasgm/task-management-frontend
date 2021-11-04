import { useRoutes } from 'react-router-dom';
import { hot } from 'react-hot-loader';

import routes from './routes';
import Header from './components/Header';

import './App.css';
import { fakeAuthProvider } from './utils/auth';

const Router = () => {
  // const isLogged = authSelectors.isLogged();
  const isLogged = fakeAuthProvider.isAuthenticated;

  return useRoutes(routes(isLogged));
};

const App = () => {
  return (
    <div>
      <Header />
      <Router />
    </div>
  );
};

export default hot(module)(App);
