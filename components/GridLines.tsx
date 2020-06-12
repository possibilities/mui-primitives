import React from 'react'
import Box from '../components/Box'
import { useTheme } from '@material-ui/core/styles'

const fill = <T extends {}>(defaultFillValue: T, lengthOfNewArray: number) =>
  [...Array(lengthOfNewArray).keys()].map(() => defaultFillValue)

const GridLines = () => {
  const theme = useTheme()
  return (
    <>
      {fill(1, 500).map((_, n) => (
        <Box
          key={n}
          style={{ pointerEvents: 'none', opacity: n % 2 === 0 ? 0 : 0.3 }}
          bgcolor='#000'
          zIndex={1}
          position='fixed'
          top={`${n * theme.treat.grid}px`}
          left={0}
          right={0}
          height={`${theme.treat.grid}px`}
        />
      ))}
    </>
  )
}

export default GridLines
