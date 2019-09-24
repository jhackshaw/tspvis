import React from 'react';
import { ThemeProvider } from '@material-ui/styles';
import { CssBaseline, createMuiTheme } from '@material-ui/core';
import blue from '@material-ui/core/colors/blue';
import orange from '@material-ui/core/colors/orange';
import { Provider } from 'react-redux';
import store from './src/store/store';
import 'react-vis/dist/style.css'


const theme = createMuiTheme({
  palette: {
    primary: blue,
    secondary: orange,
    type: 'light'
  }
})

export const wrapRootElement = ({ element }) => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <Provider store={store}>
      { element }
    </Provider>
  </ThemeProvider>
)
