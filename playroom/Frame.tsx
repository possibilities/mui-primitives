import React, { ReactNode } from 'react'
import CssBaseline from '@material-ui/core/CssBaseline'
import theme from '../theme'
import { ThemeProvider as MaterialUiThemeProvider } from '@material-ui/core/styles'
import { ThemeProvider as StyledComponentsThemeProvider } from 'styled-components'
import GridLines from '../components/GridLines'

const Frame = ({ children }: { children: ReactNode }) => (
  <MaterialUiThemeProvider theme={theme}>
    <StyledComponentsThemeProvider theme={theme}>
      {false && <GridLines />}
      <CssBaseline />
      {children}
    </StyledComponentsThemeProvider>
  </MaterialUiThemeProvider>
)

export default Frame
