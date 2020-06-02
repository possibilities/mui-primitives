import { Breakpoint } from '@material-ui/core/styles/createBreakpoints'
import React, { ReactNode } from 'react'
import { Theme, withTheme } from '@material-ui/core/styles'
import styled from 'styled-components'
import toResponsiveBreakpoint from '../modules/toResponsiveBreakpoint'

export interface HiddenProps {
  children: ReactNode
  inline?: boolean
  above?: Breakpoint
  below?: Breakpoint
}

type CssDisplayValue = 'inline' | 'block' | 'none'

const hiddenStyles = ({
  above,
  below,
  inline,
  theme,
}: HiddenProps & { theme: Theme }) => {
  const indexOfHideBelowBreakpoint = below
    ? theme.breakpoints.keys.indexOf(below)
    : -1
  const indexOfHideAboveBreakpoint = above
    ? theme.breakpoints.keys.indexOf(above)
    : theme.breakpoints.keys.length
  const responsiveDisplay = theme.breakpoints.keys.map(
    (_key: Breakpoint, index: number) => {
      return index <= indexOfHideAboveBreakpoint &&
        index >= indexOfHideBelowBreakpoint
        ? inline
          ? 'inline'
          : 'block'
        : 'none'
    },
  )
  return responsiveDisplay.map(
    (display: CssDisplayValue, index: number) =>
      `
        ${toResponsiveBreakpoint(theme, index)} {
          display: ${display};
        }
      `,
  )
}
const HiddenSpan = withTheme(styled.span<HiddenProps>`
  ${hiddenStyles}
`)

const HiddenDiv = withTheme(styled.div<HiddenProps>`
  ${hiddenStyles}
`)

const Hidden = ({ above, below, inline, children }: HiddenProps) => {
  const HiddenElement = inline ? HiddenSpan : HiddenDiv
  return (
    <HiddenElement above={above} below={below} inline={inline}>
      {children}
    </HiddenElement>
  )
}

export default Hidden
