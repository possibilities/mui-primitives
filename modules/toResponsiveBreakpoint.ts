import { Theme } from '@material-ui/core/styles'

const toResponsiveBreakpoint = ({ breakpoints }: Theme, index: number) =>
  breakpoints.up(breakpoints.keys[index])

export default toResponsiveBreakpoint
