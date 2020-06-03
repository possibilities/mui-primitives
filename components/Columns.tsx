import React, { ReactNode } from 'react'
import { Breakpoint } from '@material-ui/core/styles/createBreakpoints'
import toResponsiveProps, { ResponsiveProp } from '../modules/toResponsiveProps'
import styled from 'styled-components'
import flattenChildren from 'react-keyed-flatten-children'
import Column, { ColumnProps } from './Column'
import getFlexboxAlignForAlignYProp, {
  AlignYProp,
} from '../modules/getFlexboxAlignForAlignYProp'
import toResponsiveBreakpoint from '../modules/toResponsiveBreakpoint'
import SetTopMarginSpacingHack from '../components/SetTopMarginSpacingHack'

const widthPropToDecimal = {
  '1/2': `${(1 / 2) * 100}%`,
  '1/3': `${(1 / 3) * 100}%`,
  '2/3': `${(2 / 3) * 100}%`,
  '1/4': `${(1 / 4) * 100}%`,
  '3/4': `${(3 / 4) * 100}%`,
  '1/5': `${(1 / 5) * 100}%`,
  '2/5': `${(2 / 5) * 100}%`,
  '3/5': `${(3 / 5) * 100}%`,
  '4/5': `${(4 / 5) * 100}%`,
}

const fill = <T extends {}>(defaultFillValue: T, lengthOfNewArray: number) =>
  [...Array(lengthOfNewArray).keys()].map(() => defaultFillValue)

export interface ColumnsProps {
  children: ReactNode
  reverse?: boolean
  space: ResponsiveProp<number>
  alignY?: ResponsiveProp<AlignYProp>
  collapseBelow?: Breakpoint
}

const extractColumnPropsFromChild = (child: ReactNode) =>
  child && typeof child === 'object' && 'type' in child && child.type === Column
    ? (child.props as ColumnProps)
    : undefined

const SetColumnStyles = styled.div<Pick<ColumnsProps, 'space' | 'children'>>`
  ${({ children: columnItem }) => {
    const columnProps = extractColumnPropsFromChild(columnItem)
    if (columnProps?.width === 'content') return
    if (!columnProps?.width) return 'width: 100%;'
    return `width: ${widthPropToDecimal[columnProps.width]};`
  }}
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

const SetColumnsStyles = styled.div<
  Pick<ColumnsProps, 'reverse' | 'space' | 'alignY' | 'collapseBelow'>
>`
  ${({ reverse }) =>
    reverse ? `flex-direction: row-reverse;` : `flex-direction: row;`}
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

const Columns = ({
  alignY,
  space,
  reverse,
  collapseBelow,
  children: columnItems,
}: ColumnsProps) => (
  <SetTopMarginSpacingHack space={space}>
    <SetColumnsStyles
      space={space}
      alignY={alignY}
      reverse={reverse}
      collapseBelow={collapseBelow}
    >
      {flattenChildren(columnItems).map((columnItem, columnItemIndex) => (
        <SetColumnStyles key={columnItemIndex} space={space}>
          {columnItem}
        </SetColumnStyles>
      ))}
    </SetColumnsStyles>
  </SetTopMarginSpacingHack>
)

export default Columns
