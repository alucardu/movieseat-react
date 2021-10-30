import {createTheme} from '@mui/material/styles';
import {grey, purple} from '@mui/material/colors';


let theme = createTheme({
  palette: {
    primary: {
      main: purple[700],
      light: purple[50],
    },
    text: {
      primary: grey[900],
      secondary: grey[50],
    },
    background: {
      default: grey[900],
    },
  },
});

theme = createTheme((theme), {
  components: {
    MuiPopover: {
      styleOverrides: {
        paper: {
          padding: theme.spacing(1),
        },
      },
    },
    MuiFormControl: {
      styleOverrides: {
        root: {
          'paddingBottom': theme.spacing(1),
          'label': {
            color: 'navajowhite',
          },
          '.MuiInput-underline': {
            '&:before': {
              borderBottom: '1px solid grey',
            },
            '&:hover:not(.Mui-disabled):before': {
              borderBottom: '2px solid blue',
            },
            '&:after': {
              borderBottom: '2px solid yellow',
            },
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          'input': {
            'color': theme.palette.grey[200],
            '&:-webkit-autofill': {
              transitionDelay: '99999s',
              transitionProperty: 'background-color, color',
            },
          },
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        root: {
          'transition': 'all 0.11s ease-in',
          '& .MuiListItem-root': {
            'transition': 'all 0.11s ease-in',
            '&:hover': {
              'background': theme.palette.primary.light,
              'paddingLeft': theme.spacing(0.5),
            },
          },
        },
      },
    },
  },
});


export default theme;
