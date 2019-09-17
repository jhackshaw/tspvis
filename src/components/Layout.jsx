import React from "react"
import { ThemeProvider } from '@material-ui/styles';
import { CssBaseline, createMuiTheme } from '@material-ui/core';
import ContentRoot from './ContentRoot';


const theme = createMuiTheme({
  palette: {
    type: 'light'
  }
})


const Layout = ({ children }) => {

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ContentRoot>
        { children }
      </ContentRoot>
    </ThemeProvider>
  )
}


export default Layout
