import { createTheme } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Theme {
    custom: {
      primaryLight: string;
      primaryMain: string;
      primaryDark: string;
      secondaryLight: string;
      secondaryMain: string;
      secondaryDark: string;
      background: string;
      paper: string;
      textPrimary: string;
      textSecondary: string;
    };
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    custom?: {
      primaryLight?: string;
      primaryMain?: string;
      primaryDark?: string;
      secondaryLight?: string;
      secondaryMain?: string;
      secondaryDark?: string;
      background?: string;
      paper?: string;
      textPrimary?: string;
      textSecondary?: string;
    };
  }
}

// Create a theme instance with kid-friendly colors (no pink)
const theme = createTheme({
  palette: {
    primary: {
      light: '#4f83cc',
      main: '#01579b',
      dark: '#002f6c',
      contrastText: '#ffffff',
    },
    secondary: {
      light: '#63ccff',
      main: '#0091ea',
      dark: '#0064b7',
      contrastText: '#000000',
    },
    background: {
      default: '#e8f5e9',
      paper: '#ffffff',
    },
    text: {
      primary: '#1b5e20',
      secondary: '#2e7d32',
    },
  },
  typography: {
    fontFamily: [
      '"Nunito"',
      '"Roboto"',
      '"Helvetica"',
      'Arial',
      'sans-serif',
      '"Tamil Sangam MN"',
      '"Latha"',
      '"Nirmala UI"',
    ].join(','),
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
      lineHeight: 1.2,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
      lineHeight: 1.3,
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 600,
      lineHeight: 1.3,
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 500,
      lineHeight: 1.4,
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 500,
      lineHeight: 1.4,
    },
    h6: {
      fontSize: '1.1rem',
      fontWeight: 500,
      lineHeight: 1.4,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.6,
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.6,
    },
    button: {
      textTransform: 'none',
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          padding: '8px 24px',
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          },
        },
        contained: {
          '&:hover': {
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)',
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: '0 2px 10px rgba(0, 0, 0, 0.08)',
        },
      },
    },
  },
  custom: {
    primaryLight: '#4f83cc',
    primaryMain: '#01579b',
    primaryDark: '#002f6c',
    secondaryLight: '#63ccff',
    secondaryMain: '#0091ea',
    secondaryDark: '#0064b7',
    background: '#e8f5e9',
    paper: '#ffffff',
    textPrimary: '#1b5e20',
    textSecondary: '#2e7d32',
  },
});

export default theme;
