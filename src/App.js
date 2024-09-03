import { createTheme } from '@mui/material';
import './App.css';
import AppRoutes from './components/appRoutes';
import { ThemeProvider } from '@emotion/react';

const theme = createTheme({
  palette: {
    // primary: {
    //   main: 'rgb(255, 255, 255)', // צבע חום לדוגמה
    // },
    // secondary: {
    //   main: 'rgb(255, 255, 255)', // צבע חום בהיר לדוגמה
    // },
    // הוסף כאן צבעים נוספים אם יש צורך
  },
  typography: {
    // הוסף כאן הגדרות טיפוגרפיה נוספות אם יש צורך
  },
});

function App() {
  return (
    < ThemeProvider theme={theme}>
      <AppRoutes></AppRoutes>
    </ThemeProvider>
  );
}

export default App;
