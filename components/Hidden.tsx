import { Breakpoint } from '@material-ui/core/styles/createBreakpoints'
import React, { ReactNode } from 'react'
import Box from 'components/Box'
import { useTheme } from '@material-ui/core/styles'

export interface HiddenProps {
  children: ReactNode
  inline?: boolean
  above?: Breakpoint
  below?: Breakpoint
}

const Hidden = ({ above, below, inline, children }: HiddenProps) => {
  const theme = useTheme()
  const indexOfHideBelowBreakpoint = below
    ? theme.breakpoints.keys.indexOf(below)
    : -1
  const indexOfHideAboveBreakpoint = above
    ? theme.breakpoints.keys.indexOf(above)
    : theme.breakpoints.keys.length
  const display = theme.breakpoints.keys.map(
    (_key: Breakpoint, index: number) => {
      return index <= indexOfHideAboveBreakpoint &&
        index >= indexOfHideBelowBreakpoint
        ? inline
          ? 'inline'
          : 'block'
        : 'none'
    },
  )
  return (
    <Box component={inline ? 'span' : 'div'} display={display}>
      {children}
    </Box>
  )
}

export default Hidden
