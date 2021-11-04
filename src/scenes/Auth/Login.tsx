import { Typography, Link, Button } from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

import { fakeAuthProvider } from '../../utils/auth';

const Login = () => {
  const navigate = useNavigate();
  const handleLogin = () => fakeAuthProvider.signin(() => navigate('/'));
  // const handleLogin = () => void 0;

  return (
    <div className="container">
      <h1>Login page</h1>
      <div>
        <Button onClick={handleLogin}>Log in</Button>
      </div>
      <Typography color="textSecondary" variant="body1">
        Not registred yet?{' '}
        <Link component={RouterLink} to={'/register'} variant="h6">
          Sign up
        </Link>
      </Typography>
    </div>
  );
};

export default Login;
