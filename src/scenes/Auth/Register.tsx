import { Typography, Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const Register = () => {
  return (
    <div className="container">
      <h1>Register page</h1>
      <Typography color="textSecondary" variant="body1">
        Registred already?{' '}
        <Link component={RouterLink} to={'/login'} variant="h6">
          Sign in
        </Link>
      </Typography>
    </div>
  );
};

export default Register;
