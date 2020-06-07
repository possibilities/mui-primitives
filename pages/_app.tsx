import Router from 'next/router'
import React, { ReactNode, useState, useEffect } from 'react'
import Head from 'next/head'
import {
  useTheme,
  ThemeProvider as MaterialUiThemeProvider,
} from '@material-ui/core/styles'
import { ThemeProvider as StyledComponentsThemeProvider } from 'styled-components'
import CssBaseline from '@material-ui/core/CssBaseline'
import theme from '../theme'
import { AppProps } from 'next/app'
import { makeStyles } from '@material-ui/core/styles'
import Box from '../components/Box'
import NakedLink from 'next/link'
import MenuIcon from '@material-ui/icons/Menu'
import CloseIcon from '@material-ui/icons/Close'
import Navigation from '../components/demo/Navigation'

const menuWidth = 130
const containerMaxWidth = 1280
const logoWidthAndHeight = 40

const useStyles = makeStyles(theme => ({
  navigation: {
    [theme.breakpoints.down('xs')]: {
      opacity: showMobileMenu => (showMobileMenu ? 1 : 0),
      left: 0,
    },
  },
  content: {
    [theme.breakpoints.down('xs')]: {
      opacity: showMobileMenu => (showMobileMenu ? 0 : 1),
      pointerEvents: showMobileMenu => (showMobileMenu ? 'none' : 'auto'),
    },
  },
  '@global': {
    body: {
      [theme.breakpoints.down('xs')]: {
        overflow: showMobileMenu => (showMobileMenu ? 'hidden' : 'auto'),
      },
    },
  },
}))

interface LayoutProps {
  children: ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  const theme = useTheme()
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const toggleSetShowMobileMenu = () => setShowMobileMenu(show => !show)
  const classes = useStyles(showMobileMenu)
  useEffect(() => {
    const handleRouteChange = () => {
      setShowMobileMenu(false)
    }
    Router.events.on('routeChangeComplete', handleRouteChange)
    return () => Router.events.off('routeChangeComplete', handleRouteChange)
  }, [])
  const headerHeightPx = `${theme.spacing(6) + logoWidthAndHeight}px`
  return (
    <>
      <Box position='fixed' top={0} left={0} right={0}>
        <Box
          display='flex'
          alignItems='center'
          maxWidth={containerMaxWidth}
          paddingX={4}
          paddingTop={4}
          paddingBottom={2}
          margin='auto'
        >
          <Box
            paddingRight={2}
            style={{ cursor: 'pointer' }}
            display={['block', 'none']}
            onClick={toggleSetShowMobileMenu}
          >
            {showMobileMenu ? <CloseIcon /> : <MenuIcon />}
          </Box>
          <NakedLink href='/'>
            <a style={{ lineHeight: 0 }}>
              <img
                src='/logo.png'
                width={logoWidthAndHeight}
                height={logoWidthAndHeight}
              />
            </a>
          </NakedLink>
        </Box>
      </Box>

      <Box margin='0 auto' maxWidth={containerMaxWidth}>
        <Box
          position='fixed'
          top={headerHeightPx}
          bottom={0}
          width={menuWidth}
          padding={4}
          className={classes.navigation}
        >
          <Navigation />
        </Box>
        <Box
          padding={4}
          marginTop={headerHeightPx}
          marginLeft={[0, `${menuWidth}px`]}
          position='relative'
          className={classes.content}
          bgcolor='background.default'
        >
          {children}
        </Box>
      </Box>
    </>
  )
}

const App = (props: AppProps) => {
  const { Component, pageProps } = props

  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles) {
      const parentElement = jssStyles.parentElement as HTMLElement
      parentElement.removeChild(jssStyles)
    }
  }, [])

  return (
    <>
      <Head>
        <meta
          name='viewport'
          content='minimum-scale=1, initial-scale=1, width=device-width'
        />
        <title>MUI Primitives</title>
      </Head>
      <MaterialUiThemeProvider theme={theme}>
        <StyledComponentsThemeProvider theme={theme}>
          <CssBaseline />
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </StyledComponentsThemeProvider>
      </MaterialUiThemeProvider>
    </>
  )
}

export default App
