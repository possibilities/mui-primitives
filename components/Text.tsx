import React, { ReactNode } from 'react'
import styled from 'styled-components'
import toResponsiveProps, { ResponsiveProp } from '../modules/toResponsiveProps'
import toResponsiveBreakpoint from '../modules/toResponsiveBreakpoint'
import { Theme } from '@material-ui/core/styles'

export interface TextProps {
  id?: string
  children: ReactNode
  size?: 'xsmall' | 'small' | 'standard' | 'large'
  weight?: 'regular' | 'medium' | 'strong'
  align?: ResponsiveProp<'left' | 'right' | 'center'>
  truncate?: boolean
}

const fontSizes = {
  xsmall: 12,
  small: 14,
  standard: 16,
  large: 18,
}

const lineHeights = {
  xsmall: 20,
  small: 20,
  standard: 24,
  large: 28,
}

const fontWeights = {
  regular: 400,
  medium: 500,
  strong: 700,
}

const fontSize = ({ size = 'standard' }: TextProps) =>
  `font-size: ${fontSizes[size]}px;`

const lineHeight = ({ size = 'standard' }: TextProps) =>
  `line-height: ${lineHeights[size]}px;`

const fontWeight = ({ weight = 'regular' }: TextProps) =>
  `font-weight: ${fontWeights[weight]};`

const truncateWithEllipses = ({ truncate }: TextProps) =>
  truncate &&
  `
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  `

const textAlign = ({ align, theme }: TextProps & { theme: Theme }) =>
  align &&
  toResponsiveProps(align).map(
    (align, index) =>
      align &&
      `
        ${toResponsiveBreakpoint(theme, index)} {
          text-align: ${align};
        }
      `,
  )

const StyledText = styled.div<TextProps>`
  ${fontSize}
  ${lineHeight}
  ${fontWeight}
  ${textAlign}
  ${truncateWithEllipses}
`

const Text = ({ id, children, size, weight, align, truncate }: TextProps) => (
  <StyledText
    id={id}
    size={size}
    weight={weight}
    align={align}
    truncate={truncate}
  >
    {children}
  </StyledText>
)

export default Text
