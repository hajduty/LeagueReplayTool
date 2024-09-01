// src/theme.ts
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark', // You can change this to 'dark' for a dark theme
    primary: {
      main: '#C89B3C', // Custom primary color
    },
    secondary: {
      main: '#dc004e', // Custom secondary color
    },
    text: {
      primary: '#A09B8C', // Primary text color
      secondary: '#555555', // Secondary text color
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
    h1: {
      fontSize: '2rem',
      fontWeight: 500,
    },
    h2: {
      fontSize: '1.5rem',
      fontWeight: 500,
    },
    // Add more typography styles as needed
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none', // Disable uppercase transformation
          borderRadius: 2, // Custom border radius
        },
      },
    },
    // Customize other components as needed
  },
});

export default theme;
