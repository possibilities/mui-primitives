export type BoxProps = BordersProps &
  FlexboxProps &
  DisplayProps &
  SizingProps &
  PaletteProps &
  SpacingProps &
  PositionsProps

import {
  borders,
  BordersProps,
  flexbox,
  FlexboxProps,
  display,
  DisplayProps,
  sizing,
  SizingProps,
  palette,
  PaletteProps,
  spacing,
  SpacingProps,
  positions,
  PositionsProps,
} from '@material-ui/system'
import styled from 'styled-components'

const Box = styled.div<BoxProps>`
  ${borders}
  ${flexbox}
  ${display}
  ${sizing}
  ${palette}
  ${positions}
  ${spacing}
`

Box.displayName = 'Box'

export default Box
