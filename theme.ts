import createMuiTheme from '@material-ui/core/styles/createMuiTheme'

declare module '@material-ui/core/styles/createMuiTheme' {
  interface Theme {
    treat: {
      grid: number
      typography: {
        fontFamily: string
        descenderHeightScale: number
        capHeightScale: number
        heading: any
        text: any
      }
    }
  }
  interface ThemeOptions {
    treat: {
      grid: number
      typography: {
        fontFamily: string
        fontWeight: any
        webFont: string
        descenderHeightScale: number
        capHeightScale: number
        heading: any
        text: any
      }
    }
  }
}

const gridHeightPx = 4

const theme = createMuiTheme({
  treat: {
    grid: gridHeightPx,
    typography: {
      fontFamily: "'Nunito Sans', sans-serif",
      // TODO Use in _document
      webFont: 'Nunito Sans',
      descenderHeightScale: 0.19,
      capHeightScale: 0.66,
      // TODO Use in _document
      fontWeight: {
        regular: 400,
        medium: 600,
        strong: 800,
      },
      heading: {
        weight: {
          weak: 'regular',
          regular: 'medium',
        },
        level: {
          '1': {
            mobile: {
              size: 36,
              rows: 12,
            },
            tablet: {
              size: 36,
              rows: 12,
            },
          },
          '2': {
            mobile: {
              size: 28,
              rows: 10,
            },
            tablet: {
              size: 28,
              rows: 10,
            },
          },
          '3': {
            mobile: {
              size: 24,
              rows: 9,
            },
            tablet: {
              size: 24,
              rows: 9,
            },
          },
          '4': {
            mobile: {
              size: 20,
              rows: 7,
            },
            tablet: {
              size: 20,
              rows: 7,
            },
          },
        },
      },
      text: {
        xsmall: {
          mobile: {
            size: 12,
            rows: 4,
          },
          tablet: {
            size: 12,
            rows: 4,
          },
        },
        small: {
          mobile: {
            size: 14,
            rows: 4,
          },
          tablet: {
            size: 14,
            rows: 4,
          },
        },
        standard: {
          mobile: {
            size: 16,
            rows: 6,
          },
          tablet: {
            size: 16,
            rows: 6,
          },
        },
        large: {
          mobile: {
            size: 18,
            rows: 6,
          },
          tablet: {
            size: 18,
            rows: 6,
          },
        },
      },
    },
  },
})

export default theme
