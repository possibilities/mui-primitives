import React from 'react'
import Box from 'components/Box'

export interface PlaceholderProps {
  width?: number | string
  height?: number
  label?: string
}

const Placeholder = ({ width, height, label }: PlaceholderProps) => (
  <Box
    bgcolor='#ccc'
    color='#909090'
    border='2px solid #909090'
    display='flex'
    alignItems='center'
    justifyContent='center'
    height={height}
    width={width === undefined ? 'auto' : width}
  >
    <Box paddingX={1} paddingY={0.5}>
      {label}
    </Box>
  </Box>
)

export default Placeholder
