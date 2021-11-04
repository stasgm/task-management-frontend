import { Typography, AppBar, Toolbar, Link, Box, Button } from '@mui/material';

import { Link as RouterLink, useNavigate } from 'react-router-dom';

import { fakeAuthProvider } from '../utils/auth';

const Header = () => {
  const navigate = useNavigate();
  const handleLogout = () => fakeAuthProvider.signout(() => navigate('/'));
  const handleLogin = () => fakeAuthProvider.signin(() => navigate('/'));

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link component={RouterLink} to={'/'} variant="h6" color="#fff">
              Home
            </Link>
          </Typography>
          {fakeAuthProvider.isAuthenticated ? (
            <Button color="inherit" onClick={handleLogout}>
              Log out
            </Button>
          ) : (
            <Button color="inherit" onClick={handleLogin}>
              Log in
            </Button>
          )}
          {/* <Typography style={{ flexGrow: 1 }}>
            <Link component={RouterLink} to={'/'} variant="h6" color="#fff">
              Home
            </Link>
          </Typography>
          <Typography style={{ flexGrow: 1, alignContent: 'right' }}>
            {fakeAuthProvider.isAuthenticated ? (
              <Link onClick={handleLogout} href="/#" variant="h6" color="#fff">
                Sign out
              </Link>
            ) : (
              <Link onClick={handleLogin} href="/#" variant="h6" color="#fff">
                Sign in
              </Link>
            )}
          </Typography> */}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
