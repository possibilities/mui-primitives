import React, { ReactNode } from 'react'
import toResponsiveProps, { ResponsiveProp } from '../modules/toResponsiveProps'
import { withTheme } from '@material-ui/core/styles'
import getFlexboxAlignForAlignProp from '../modules/getFlexboxAlignForAlignProp'
import flattenChildren from 'react-keyed-flatten-children'
import Hidden, { HiddenProps } from './Hidden'
import styled from 'styled-components'
import SetTopMarginSpacingHack from '../components/SetTopMarginSpacingHack'
import toResponsiveBreakpoint from '../modules/toResponsiveBreakpoint'

import { AlignProp } from '../modules/getFlexboxAlignForAlignProp'

export interface StackProps {
  children: ReactNode
  space: ResponsiveProp<number>
  align?: ResponsiveProp<AlignProp>
}

const extractHiddenPropsFromChild = (child: ReactNode) =>
  child && typeof child === 'object' && 'type' in child && child.type === Hidden
    ? (child.props as HiddenProps)
    : null

const SetStackItemSpacing = withTheme(styled.div<StackProps>`
  height: 100%;
  ${({ space, theme }) =>
    space &&
    toResponsiveProps(space).map(
      (space, index) =>
        `
          ${toResponsiveBreakpoint(theme, index)} {
            padding-top: ${theme.spacing(space)}px;
          }
        `,
    )}
  ${({ children: stackItem, theme }) => {
    const hiddenProps = extractHiddenPropsFromChild(stackItem)
    const indexOfHideBelowBreakpoint = hiddenProps?.below
      ? theme.breakpoints.keys.indexOf(hiddenProps.below)
      : 0
    const indexOfHideAboveBreakpoint = hiddenProps?.above
      ? theme.breakpoints.keys.indexOf(hiddenProps.above)
      : theme.breakpoints.keys.length - 1
    const responsiveDisplay = theme.breakpoints.keys.map(
      (_key: string, index: number) => {
        return index <= indexOfHideAboveBreakpoint &&
          index >= indexOfHideBelowBreakpoint
          ? 'block'
          : 'none'
      },
    )
    return responsiveDisplay.map(
      (display: string, index: number) =>
        `
          ${toResponsiveBreakpoint(theme, index)} {
            display: ${display};
          }
        `,
    )
  }}
`)

const SetStackAlignment = withTheme(styled.div<Pick<StackProps, 'align'>>`
  display: flex;
  flex-direction: column;
  ${({ align, theme }) =>
    align &&
    toResponsiveProps(align).map(
      (align, index) =>
        align &&
        `
          ${toResponsiveBreakpoint(theme, index)} {
            align-items: ${getFlexboxAlignForAlignProp(align)};
          }
        `,
    )}
`)

const Stack = ({ children: stackItems, space, align }: StackProps) => (
  <SetTopMarginSpacingHack space={space}>
    <SetStackAlignment align={align}>
      {flattenChildren(stackItems).map((stackItem, stackItemIndex) => (
        <SetStackItemSpacing key={stackItemIndex} space={space}>
          {stackItem}
        </SetStackItemSpacing>
      ))}
    </SetStackAlignment>
  </SetTopMarginSpacingHack>
)

export default Stack
