import Main from "./components/Main";
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#0093AB',
      light: '#00AFC1',
      dark: '#006778',
      white: '#FFFFFF',
      disabled: '#EBEBE4',
      success: '#4BB543',
      failure: '#ff3333'
    },
    secondary: {
      main: '#FFD124',
      grey: '#696969',
    },
  },
  typography: {
    fontFamily: [
      'Montserrat',
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
  }
});

function App() {
  return (
    <ThemeProvider theme={theme}>
        <Main></Main>
    </ThemeProvider>
  );
}

export default App;
