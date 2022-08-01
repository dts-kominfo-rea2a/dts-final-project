const getDesignTokens = (mode) => ({
  palette: {
    mode,
    ...(mode === "light"
      ? {
          primary: {
            main: "#4B0888",
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
          background: {
            paper: "#fff",
            default: "#f2f2f2",
          },
          text: {
            primary: "#111111",
          },
          breakpoints: {
            values: {
              xs: 0,
              sm: 600,
              md: 900,
              lg: 1200,
              xl: 1536,
            },
          },
        }
      : /** pallete for dark mode */
        {
          primary: {
            main: "#4B0882",
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
          background: {
            paper: "#121212",
            default: "#121212",
          },
          text: {
            primary: "#fff",
          },
          breakpoints: {
            values: {
              xs: 0,
              sm: 600,
              md: 900,
              lg: 1200,
              xl: 1536,
            },
          },
        }),
  },
  components: {
    MuiAppBar: {
      defaultProps: {
        color: "inherit",
      },
    },
    MuiCard: {
      defaultProps: {
        color: "inherit",
      },
      styleOverrides: {
        root: {
          borderRadius: '12px'
        }
      }
    },
    MuiContainer: {
      defaultProps: {
        color: "inherit",
      },
    },
    MuiGrid: {
      defaultProps: {
        color: "inherit",
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "8px",
        },
      },
    },
  },
});

export default getDesignTokens;
