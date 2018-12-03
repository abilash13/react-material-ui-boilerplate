import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#7986CB',
      main: '#3F51B5',
      dark: '#303F9F',
      contrastText: '#FFFFFF',
    },
    secondary: {
      light: '#FF4081',
      main: '#F50057',
      dark: '#C51162',
      contrastText: '#FFFFFF',
    },
  },
  typography: {
    useNextVariants: true,
  },
});

export default theme;
