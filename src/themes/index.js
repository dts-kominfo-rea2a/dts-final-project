import { createTheme } from "@mui/material";

const selectedTheme = true;

const themeMode = selectedTheme ? "dark" : "light";

const themes = createTheme({
  palette: {
    mode: themeMode,
    primary: {
      main: "#752FFF",
    },
    secondary: {
      main: "#48426d",
    },
    success: {
      main: "#OC3B2E",
    },
    error: {
      main: "#FE3A3a",
    },
    warning: {
      main: "#FFBB31",
    },
    info: {
      main: "#67AEEE",
    },
    // background: {
    //   default: '#fff',
    //   paper: '#fff',
    // },
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 900,
        lg: 1200,
        xl: 1536,
      },
    },
  },
  components: {
    MuiAppBar: {
      defaultProps: {
        color: "inherit"
      }
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: 'inherit'
        }
      }
    },
    MuiGrid: {
      styleOverrides: {
        root: {
          backgroundColor: "inherit"
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '1em'
        }
      }
    }
  }
});

export default themes;
