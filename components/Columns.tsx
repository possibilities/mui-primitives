import React, { ReactNode } from 'react'
import Box from 'components/Box'
import { useTheme } from '@material-ui/core/styles'
import { Breakpoint } from '@material-ui/core/styles/createBreakpoints'
import toResponsiveProps, { ResponsiveProp } from 'modules/toResponsiveProps'
import flattenChildren from 'react-keyed-flatten-children'
import useNegativeTopMargin from 'modules/useNegativeTopMargin'
import Column, { ColumnProps } from 'components/Column'
import getFlexboxAlignForAlignYProp, {
  AlignYProp,
} from 'modules/getFlexboxAlignForAlignYProp'

const widthPropToDecimal = {
  content: undefined,
  '1/2': 1 / 2,
  '1/3': 1 / 3,
  '2/3': 2 / 3,
  '1/4': 1 / 4,
  '3/4': 3 / 4,
  '1/5': 1 / 5,
  '2/5': 2 / 5,
  '3/5': 3 / 5,
  '4/5': 4 / 5,
}

type ColumnWidthProp = keyof typeof widthPropToDecimal

const negative = (positiveNumber: number) => -positiveNumber

const fill = <T extends {}>(defaultFillValue: T, lengthOfNewArray: number) =>
  [...Array(lengthOfNewArray).keys()].map(() => defaultFillValue)

export interface ColumnsProps {
  children: ReactNode
  reverse?: boolean
  space?: ResponsiveProp<number>
  alignY?: ResponsiveProp<AlignYProp>
  collapseBelow?: Breakpoint
}

const useResponsiveDisplay = (collapseBelow?: Breakpoint) => {
  const theme = useTheme()
  const collapseBelowBreakpointName = collapseBelow || theme.breakpoints.keys[0]
  const indexOfCollapseBreakpoint = collapseBelow
    ? theme.breakpoints.keys.indexOf(collapseBelowBreakpointName)
    : 0
  return indexOfCollapseBreakpoint > 0
    ? [...fill('block', indexOfCollapseBreakpoint), 'flex']
    : ['flex']
}

const extractColumnPropsFromChild = (child: ReactNode) =>
  child && typeof child === 'object' && 'type' in child && child.type === Column
    ? (child.props as ColumnProps)
    : null

const Columns = ({
  children,
  alignY,
  collapseBelow,
  space,
  reverse,
}: ColumnsProps) => {
  const responsivePadding = toResponsiveProps(space || 0)
  const classes = useNegativeTopMargin(responsivePadding)
  const display = useResponsiveDisplay(collapseBelow)
  const marginLeft = responsivePadding.map(negative)
  const alignItems = alignY
    ? toResponsiveProps(alignY).map(getFlexboxAlignForAlignYProp)
    : undefined
  const flexDirection = reverse ? 'row-reverse' : 'row'
  return (
    <Box className={classes.root}>
      <Box
        marginLeft={marginLeft}
        display={display}
        alignItems={alignItems}
        flexDirection={flexDirection}
      >
        {flattenChildren(children).map((child, index) => {
          const columnProps = extractColumnPropsFromChild(child)
          const width = columnProps?.width
            ? widthPropToDecimal[columnProps.width as ColumnWidthProp]
            : '100%'
          return (
            <Box
              width={width}
              key={index}
              paddingTop={space}
              paddingLeft={space}
            >
              {child}
            </Box>
          )
        })}
      </Box>
    </Box>
  )
}

export default Columns
