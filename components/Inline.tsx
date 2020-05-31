import React, { ReactNode } from 'react'
import Box from 'components/Box'
import { Breakpoint } from '@material-ui/core/styles/createBreakpoints'
import { useTheme } from '@material-ui/core/styles'
import toResponsiveProps, { ResponsiveProp } from 'modules/toResponsiveProps'
import flattenChildren from 'react-keyed-flatten-children'
import getFlexboxAlignForAlignProp from 'modules/getFlexboxAlignForAlignProp'
import getFlexboxAlignForAlignYProp from 'modules/getFlexboxAlignForAlignYProp'
import useNegativeTopMargin from 'modules/useNegativeTopMargin'

import { AlignProp } from 'modules/getFlexboxAlignForAlignProp'
import { AlignYProp } from 'modules/getFlexboxAlignForAlignYProp'

const fill = <T extends {}>(defaultFillValue: T, lengthOfNewArray: number) =>
  [...Array(lengthOfNewArray).keys()].map(() => defaultFillValue)

const negative = (positiveNumber: number) => -positiveNumber

export interface InlineProps {
  children: ReactNode
  space: ResponsiveProp<number>
  align?: ResponsiveProp<AlignProp>
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

const Inline = ({
  children,
  space,
  align,
  alignY,
  collapseBelow,
}: InlineProps) => {
  const responsivePadding = toResponsiveProps(space || 0)
  const responsiveAlign = toResponsiveProps(align || 'left')
  const responsiveAlignY = toResponsiveProps(alignY || 'top')
  const display = useResponsiveDisplay(collapseBelow)
  const justifyContent = responsiveAlign.map(getFlexboxAlignForAlignProp)
  const alignItems = responsiveAlignY.map(getFlexboxAlignForAlignYProp)
  const marginLeft = responsivePadding.map(negative)
  const classes = useNegativeTopMargin(responsivePadding)
  return (
    <Box className={classes.root}>
      <Box
        flexWrap='wrap'
        display={display}
        flexDirection='row'
        marginLeft={marginLeft}
        alignItems={alignItems}
        justifyContent={justifyContent}
      >
        {flattenChildren(children).map((child, index) => (
          <Box
            key={index}
            minWidth='0%'
            display='flex'
            justifyContent={justifyContent}
            paddingLeft={responsivePadding}
            paddingTop={responsivePadding}
          >
            {child}
          </Box>
        ))}
      </Box>
    </Box>
  )
}

export default Inline
