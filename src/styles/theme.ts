import { createTheme, responsiveFontSizes } from '@mui/material/styles';
import { grey } from '@mui/material/colors';

// Create a theme instance.
let theme = createTheme({
  palette: {
    // primary: {
    //   main: '#2E0076',
    // },
    // secondary: teal,
  },
  shape: {
    borderRadius: 5,
  },
});

theme = responsiveFontSizes(theme);

export default theme;
