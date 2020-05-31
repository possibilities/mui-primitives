import React, { ReactNode } from 'react'
import Box from './Box'
import toResponsiveProps, { ResponsiveProp } from '../modules/toResponsiveProps'
import { useTheme } from '@material-ui/core/styles'
import getFlexboxAlignForAlignProp from '../modules/getFlexboxAlignForAlignProp'
import flattenChildren from 'react-keyed-flatten-children'
import Hidden, { HiddenProps } from './Hidden'
import useNegativeTopMargin from '../modules/useNegativeTopMargin'

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

const useStackItemResponsiveDisplay = (stackItem: ReactNode) => {
  const theme = useTheme()
  const hiddenProps = extractHiddenPropsFromChild(stackItem)
  const indexOfHideBelowBreakpoint = hiddenProps?.below
    ? theme.breakpoints.keys.indexOf(hiddenProps?.below)
    : 0
  const indexOfHideAboveBreakpoint = hiddenProps?.above
    ? theme.breakpoints.keys.indexOf(hiddenProps?.above)
    : theme.breakpoints.keys.length - 1
  return theme.breakpoints.keys.map((_key, index) => {
    return index <= indexOfHideAboveBreakpoint &&
      index >= indexOfHideBelowBreakpoint
      ? 'block'
      : 'none'
  })
}

const Stack = ({ children, space, align }: StackProps) => {
  const alignItems =
    align && toResponsiveProps(align).map(getFlexboxAlignForAlignProp)
  const responsivePadding = toResponsiveProps(space || 0)
  const classes = useNegativeTopMargin(responsivePadding)
  return (
    <Box className={classes.root}>
      <Box display='flex' flexDirection='column' alignItems={alignItems}>
        {flattenChildren(children).map((stackItem, index) => {
          const display = useStackItemResponsiveDisplay(stackItem)
          return (
            <Box key={index} display={display} paddingTop={responsivePadding}>
              {stackItem}
            </Box>
          )
        })}
      </Box>
    </Box>
  )
}

export default Stack
