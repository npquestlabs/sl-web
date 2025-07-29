import { createTheme, responsiveFontSizes } from "@mui/material/styles";
import { deepmerge } from "@mui/utils";

const palette = {
  primary: {
    main: '#0D6375',
    light: '#4390A1',
    dark: '#094552',
    contrastText: '#ffffff',
  },
  secondary: {
    main: '#F2A104',
    light: '#F5B736',
    dark: '#A97002',
    contrastText: '#000000',
  },
  error: { main: '#D32F2F' },
  warning: { main: '#FFA000' },
  info: { main: '#1976D2' },
  success: { main: '#388E3C' },
};


const baseTheme = createTheme({
  palette,
  typography: {
    fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    h1: { fontWeight: 700 },
    h2: { fontWeight: 700 },
    h3: { fontWeight: 600 },
    h4: { fontWeight: 600 },
    h5: { fontWeight: 600 },
  },
  
  components: {
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 8,
          padding: '10px 24px',
        },
        containedPrimary: {
          '&:hover': {
            backgroundColor: palette.primary.dark,
          },
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: 'outlined',
        size: 'small',
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          elevation: 0,
        },
      },
    },
    MuiAppBar: {
      defaultProps: {
        elevation: 0,
        color: 'transparent',
      },
      styleOverrides: {
        root: {
          borderBottom: '1px solid',
          borderColor: 'rgba(0, 0, 0, 0.12)',
        },
      },
    },
  },
});


const lightTheme = createTheme(
  deepmerge(baseTheme, {
    palette: {
      mode: 'light',
      background: {
        default: '#F9FAFB',
        paper: '#FFFFFF',
      },
      text: {
        primary: '#1A2027',
        secondary: '#5A6471',
      },
      divider: 'rgba(0, 0, 0, 0.12)',
    },
    components: {
      MuiAppBar: {
        styleOverrides: {
          root: {
            borderColor: 'rgba(0, 0, 0, 0.12)',
          }
        }
      },
      MuiCard: {
        styleOverrides: {
          root: {
            border: '1px solid rgba(0, 0, 0, 0.12)',
          }
        }
      }
    }
  })
);

const darkTheme = createTheme(
  deepmerge(baseTheme, {
    palette: {
      mode: 'dark',
      background: {
        default: '#1A2027',
        paper: '#242B34',
      },
      text: {
        primary: '#F2F2F2',
        secondary: '#A0AEC0',
      },
      divider: 'rgba(255, 255, 255, 0.12)',
    },
    components: {
      MuiAppBar: {
        styleOverrides: {
          root: {
            borderColor: 'rgba(255, 255, 255, 0.12)',
          }
        }
      },
      MuiCard: {
        styleOverrides: {
          root: {
            border: '1px solid rgba(255, 255, 255, 0.12)',
          }
        }
      }
    }
  })
);

const responsiveLightTheme = responsiveFontSizes(lightTheme);
const responsiveDarkTheme = responsiveFontSizes(darkTheme);

export { responsiveLightTheme as lightTheme, responsiveDarkTheme as darkTheme };