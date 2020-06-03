import React, { ReactNode } from 'react'
import { Breakpoint } from '@material-ui/core/styles/createBreakpoints'
import styled from 'styled-components'
import toResponsiveProps, { ResponsiveProp } from '../modules/toResponsiveProps'
import flattenChildren from 'react-keyed-flatten-children'
import getFlexboxAlignForAlignProp from '../modules/getFlexboxAlignForAlignProp'
import getFlexboxAlignForAlignYProp from '../modules/getFlexboxAlignForAlignYProp'
import toResponsiveBreakpoint from '../modules/toResponsiveBreakpoint'

import { AlignProp } from '../modules/getFlexboxAlignForAlignProp'
import { AlignYProp } from '../modules/getFlexboxAlignForAlignYProp'
import SetTopMarginSpacingHack from '../components/SetTopMarginSpacingHack'

const fill = <T extends {}>(defaultFillValue: T, lengthOfNewArray: number) =>
  [...Array(lengthOfNewArray).keys()].map(() => defaultFillValue)

export interface InlineProps {
  children: ReactNode
  space: ResponsiveProp<number>
  align?: ResponsiveProp<AlignProp>
  alignY?: ResponsiveProp<AlignYProp>
  collapseBelow?: Breakpoint
}

const SetInlineStyles = styled.div<
  Pick<InlineProps, 'alignY' | 'space' | 'align' | 'collapseBelow'>
>`
  flex-wrap: wrap;
  flex-direction: row;
  ${({ alignY, theme }) =>
    alignY &&
    toResponsiveProps(alignY).map(
      (alignY, index) =>
        alignY &&
        `
          ${toResponsiveBreakpoint(theme, index)} {
            align-items: ${getFlexboxAlignForAlignYProp(alignY)};
          }
        `,
    )}
  ${({ align, theme }) =>
    align &&
    toResponsiveProps(align).map(
      (align, index) =>
        align &&
        `
          ${toResponsiveBreakpoint(theme, index)} {
            justify-content: ${getFlexboxAlignForAlignProp(align)};
          }
        `,
    )}
  ${({ space, theme }) =>
    toResponsiveProps(space).map(
      (space, index) =>
        `
          ${toResponsiveBreakpoint(theme, index)} {
            margin-left: ${theme.spacing(-space)}px;
          }
        `,
    )}
  ${({ collapseBelow, theme }) => {
    const collapseBelowBreakpointName =
      collapseBelow || theme.breakpoints.keys[0]
    const indexOfCollapseBreakpoint = collapseBelow
      ? theme.breakpoints.keys.indexOf(collapseBelowBreakpointName)
      : 0
    const responsiveDisplay =
      indexOfCollapseBreakpoint > 0
        ? [...fill('block', indexOfCollapseBreakpoint), 'flex']
        : ['flex']
    return responsiveDisplay.map(
      (display, index) =>
        `
          ${toResponsiveBreakpoint(theme, index)} {
            display: ${display};
          }
        `,
    )
  }}
`

const SetInlineItemStyles = styled.div<Pick<InlineProps, 'align' | 'space'>>`
  min-width: 0%;
  display: flex;
  ${({ align, theme }) =>
    align &&
    toResponsiveProps(align).map(
      (align, index) =>
        align &&
        `
          ${toResponsiveBreakpoint(theme, index)} {
            justify-content: ${getFlexboxAlignForAlignProp(align)};
          }
        `,
    )}
  ${({ space, theme }) =>
    toResponsiveProps(space).map(
      (space, index) =>
        `
          ${toResponsiveBreakpoint(theme, index)} {
            padding-top: ${theme.spacing(space)}px;
            padding-left: ${theme.spacing(space)}px;
          }
        `,
    )}
`

const Inline = ({
  space,
  align,
  alignY,
  collapseBelow,
  children: inlineItems,
}: InlineProps) => (
  <SetTopMarginSpacingHack space={space}>
    <SetInlineStyles
      space={space}
      align={align}
      alignY={alignY}
      collapseBelow={collapseBelow}
    >
      {flattenChildren(inlineItems).map((inlineItem, inlineItemIndex) => (
        <SetInlineItemStyles align={align} space={space} key={inlineItemIndex}>
          {inlineItem}
        </SetInlineItemStyles>
      ))}
    </SetInlineStyles>
  </SetTopMarginSpacingHack>
)

export default Inline
