import { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Typography, Link, Box, Button, CircularProgress, Container, TextField } from '@mui/material';
import * as yup from 'yup';
import { useFormik } from 'formik';

import AuthService from '../../services/auth/auth.service';
import { AuthCredentialsDto } from '../../services/auth/dto/auth-credentials.dto';

const Register = () => {
  const navigate = useNavigate();

  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('');

  const handleSubmit = async (authCredentialsDto: AuthCredentialsDto) => {
    setError(false);
    setStatus('Loading');
    setLoading(true);

    const res = await AuthService.signup(authCredentialsDto);

    if (res.type === 'SIGNUP') {
      navigate('/');
    } else if (res.type === 'ERROR') {
      setError(true);
      setStatus(res.message);
    }
    setLoading(false);
  };

  const formik = useFormik<AuthCredentialsDto>({
    enableReinitialize: true,
    initialValues: {
      username: 'Stas',
      password: 'Aa!_123456!',
    },
    validationSchema: yup.object({
      username: yup.string().required('Fill the field'),
      password: yup.string().required('Fill the field'),
    }),
    onSubmit: (values) => handleSubmit(values),
  });

  return (
    <Box
      sx={{
        backgroundColor: 'background.default',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        justifyContent: 'center',
      }}
    >
      <Container
        maxWidth="xs"
        sx={{
          py: 2,
        }}
      >
        <Box
          sx={{
            mb: 2,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Typography color="textPrimary" variant="h4">
            Registration
          </Typography>
        </Box>
        <form onSubmit={formik.handleSubmit}>
          <Box sx={{ mb: 2, display: 'flex', alignItems: 'flex-end' }}>
            {loading && <CircularProgress size={20} sx={{ mx: 2 }} />}
            {error && (
              <Typography color="error" variant="h5" sx={{ flexGrow: 1, textAlign: 'end' }}>
                {status}
              </Typography>
            )}
          </Box>
          <TextField
            error={Boolean(formik.touched.username && formik.errors.username)}
            required
            fullWidth
            helperText={formik.touched.username && formik.errors.username}
            label="Username"
            margin="normal"
            name="username"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.username}
            variant="outlined"
          />
          <TextField
            error={Boolean(formik.touched.password && formik.errors.password)}
            required
            label="Password"
            fullWidth
            helperText={formik.touched.password && formik.errors.password}
            margin="normal"
            name="password"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            type="password"
            value={formik.values.password}
            variant="outlined"
          />
          <Box sx={{ py: 2 }}>
            <Button
              color="primary"
              disabled={loading || !!formik.errors.password || !!formik.errors.username}
              fullWidth
              size="large"
              type="submit"
              variant="contained"
            >
              Sign up
            </Button>
          </Box>
          <Typography color="textSecondary" variant="body1">
            Already registered?{' '}
            <Link component={RouterLink} to={'/login'} variant="h6">
              Sign in
            </Link>
          </Typography>
        </form>
      </Container>
    </Box>
  );
};

export default Register;
