import React, { ReactNode } from 'react'
import Box from 'components/Box'
import ensureArray from 'modules/ensureArray'
import flattenChildren from 'react-keyed-flatten-children'
import useNegativeTopMargin from 'modules/useNegativeTopMargin'

interface TilesProps {
  children: ReactNode
  space: ResponsiveProp<number>
  columns: ResponsiveProp<number>
}

const negative = (positiveNumber: number) => -positiveNumber

export const Tiles = ({ children, space, columns }: TilesProps) => {
  const responsivePadding = ensureArray(space || 0)
  const responsiveColumns = ensureArray(columns)
  const classes = useNegativeTopMargin(responsivePadding)
  const marginLeft = responsivePadding.map(negative)
  const flexBasis = responsiveColumns.map(columns => 100 / columns + '%')
  return (
    <Box className={classes.root}>
      <Box marginLeft={marginLeft} flexWrap='wrap' display='flex'>
        {flattenChildren(children).map((child, index) => (
          <Box
            minWidth='0%'
            flexGrow='0'
            flexShrink='0'
            flexBasis={flexBasis}
            key={index}
          >
            <Box height='100%' paddingTop={space} paddingLeft={space}>
              {child}
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  )
}

export default Tiles
