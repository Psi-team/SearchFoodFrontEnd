import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';

export const theme = responsiveFontSizes(
  createMuiTheme({
    palette: {
      // type: 'dark', // Switching the dark mode on is a single property value change.
      primary: {
        // light: will be calculated from palette.primary.main,
        main: '#311b92',
        // dark: will be calculated from palette.primary.main,
        // contrastText: will be calculated to contrast with palette.primary.main
        contrastText: '#FDFDFD',
      },
      secondary: {
        // light: will be calculated from palette.secondary.main,
        main: '#ffb5b5',
        // dark: will be calculated from palette.secondary.main,
        // contrastText: will be calculated from palette.secondary.main,
        contrastText: '#4F576D',
      },
      error: {
        main: '#c62828',
      },
      contrastThreshold: 3,
      tonalOffset: 0.2,
    },
    shape: {
      borderRadius: 30,
    },
    typography: {
      htmlFontSize: 12, //Material-UI uses rem units for the font size
      fontSize: 10,
      fontFamily: [
        'Microsoft JhengHei',
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
    },
    space: {}, //default 1 space is 8
    // breakpointers: {
    /**
     *  xs  0_     ~  599   px
     *  sm  600_   ~  959   px
     *  md  960_   ~  1279  px
     *  lg  1280_  ~  1919  px
     *  xl  1920_  ~        px
     */
    // }
    overrides: {
      MuiOutlinedInput: {
        root: {
          borderRadius: 30,
          backgroundColor: '#F9F9F9',
          // marginBottom: '2rem',

          '& fieldset': {
            borderRadius: 30,
          },
        },
      },
      MuiTypography: {
        root: {
          letterSpacing: 4,
        },
      },
      MuiButton: {
        root: {
          borderRadius: 30,
          color: '#F9F9F9',
          fontFamily: [
            'Microsoft JhengHei',
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
          ].join(','),
        },
      },
    },
  })
);
