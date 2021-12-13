import React from 'react';
import MainRouter from './MainRouter';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/styles';
import theme from './theme';
import { hot } from 'react-hot-loader';
import AppProvider from './core/AppContext';

const App = () => {
  React.useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }, []);
  return (
    <AppProvider>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <MainRouter />
        </ThemeProvider>
      </BrowserRouter>
    </AppProvider>
  );
};

export default hot(module)(App);
