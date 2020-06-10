import React, { ReactNode } from 'react'
import styled from 'styled-components'
import toResponsiveProps, { ResponsiveProp } from '../modules/toResponsiveProps'
import toResponsiveBreakpoint from '../modules/toResponsiveBreakpoint'
import { Theme } from '@material-ui/core/styles'

interface BaseKickOptions {
  typeSizeModifier: number
  baseFontSize: number
  descenderHeightScale: number
  capHeight: number
  typeRowSpan: number
  gridRowHeight: number
}

const basekick = ({
  typeSizeModifier,
  baseFontSize,
  descenderHeightScale,
  typeRowSpan,
  gridRowHeight,
  capHeight,
}: BaseKickOptions) => {
  const fontSize = typeSizeModifier * baseFontSize

  const calculateTypeOffset = (lh: number) => {
    const lineHeightScale = lh / fontSize
    return (lineHeightScale - 1) / 2 + descenderHeightScale
  }

  const lineHeight = typeRowSpan * gridRowHeight
  const typeOffset = calculateTypeOffset(lineHeight)

  const topSpace = lineHeight - capHeight * fontSize
  const heightCorrection =
    topSpace > gridRowHeight ? topSpace - (topSpace % gridRowHeight) : 0

  const preventCollapse = 1

  return {
    fontSize,
    lineHeight,
    typeOffset,
    preventCollapse,
    heightCorrection,
  }
}

interface TextDefinition {
  rows: number
  size: number
}

export interface TextProps {
  id?: string
  children: ReactNode
  size?: 'xsmall' | 'small' | 'standard' | 'large'
  weight?: 'regular' | 'medium' | 'strong'
  align?: ResponsiveProp<'left' | 'right' | 'center'>
  truncate?: boolean
}

const alignTextToGrid = (
  textDefinition: TextDefinition,
  gridRowHeight: number,
  descenderHeightScale: number,
  capHeight: number,
) =>
  basekick({
    baseFontSize: 1,
    typeSizeModifier: textDefinition.size,
    typeRowSpan: textDefinition.rows,
    gridRowHeight,
    descenderHeightScale,
    capHeight,
  })

const fontStyles = ({
  size = 'standard',
  theme,
}: TextProps & { theme: Theme }) => {
  const tablet = basekick({
    baseFontSize: 1,
    typeSizeModifier: theme.treat.typography.text[size].tablet.size,
    typeRowSpan: theme.treat.typography.text[size].tablet.rows,
    gridRowHeight: theme.treat.grid,
    descenderHeightScale: theme.treat.typography.descenderHeightScale,
    capHeight: theme.treat.typography.capHeightScale,
  })
  return `
    font-family: ${theme.treat.typography.fontFamily};
    font-size: ${tablet.fontSize}px;
    letter-spacing: normal;
    line-height: ${tablet.lineHeight}px;
    transform: translateY(${tablet.typeOffset}em);
    padding-top: ${tablet.preventCollapse}px;
    &::before {
      content: "";
      margin-top: -${tablet.heightCorrection + tablet.preventCollapse}px;
      display: block;
      height: 0;
    }
  `
}

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

const StyledText = styled.span<TextProps>`
  display: block;
  ${fontStyles}
  ${textAlign}
`

const TruncatedText = styled.span`
  display: block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

const Text = ({ id, children, size, weight, align, truncate }: TextProps) =>
  truncate ? (
    <StyledText id={id} size={size} weight={weight} align={align}>
      <TruncatedText>{children}</TruncatedText>
    </StyledText>
  ) : (
    <StyledText id={id} size={size} weight={weight} align={align}>
      {children}
    </StyledText>
  )

export default Text
