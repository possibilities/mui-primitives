import React, { ReactNode } from 'react'
import styled from 'styled-components'
import toResponsiveProps, { ResponsiveProp } from '../modules/toResponsiveProps'
import toResponsiveBreakpoint from '../modules/toResponsiveBreakpoint'
import { Theme } from '@material-ui/core/styles'

type HeadingLevel = '1' | '2' | '3' | '4'
type HeadingTag = 'h1' | 'h2' | 'h3' | 'h4'

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

const levelToHeadingTag: Record<string, HeadingTag> = {
  '1': 'h1',
  '2': 'h2',
  '3': 'h3',
  '4': 'h4',
}

export interface HeadingProps {
  id?: string
  children: ReactNode
  level: HeadingLevel
  weight?: 'regular' | 'weak'
  align?: ResponsiveProp<'left' | 'right' | 'center'>
  truncate?: boolean
  component?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
}

const fontStyles = ({ level, theme }: HeadingProps & { theme: Theme }) => {
  const mobile = basekick({
    baseFontSize: 1,
    typeSizeModifier: theme.treat.typography.heading.level[level].mobile.size,
    typeRowSpan: theme.treat.typography.heading.level[level].mobile.rows,
    gridRowHeight: theme.treat.grid,
    descenderHeightScale: theme.treat.typography.descenderHeightScale,
    capHeight: theme.treat.typography.capHeightScale,
  })
  console.log(mobile)
  return `
    font-family: ${theme.treat.typography.fontFamily};
    font-weight: 600;
    font-size: ${mobile.fontSize}px;
    letter-spacing: normal;
    line-height: ${mobile.lineHeight}px;
    transform: translateY(${mobile.typeOffset}em);
    padding-top: ${mobile.preventCollapse}px;
    &::before {
      content: '';
      margin-top: -${mobile.heightCorrection + mobile.preventCollapse}px;
      display: block;
      height: 0;
    }
  `
}

const textAlign = ({ align, theme }: HeadingProps & { theme: Theme }) =>
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

const StyledHeading = styled.div<HeadingProps>`
  margin: 0;
  ${fontStyles}
  ${textAlign}
`

const TruncatedHeading = styled.span`
  display: block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

const headingTagForLevel = (level: HeadingLevel): HeadingTag =>
  levelToHeadingTag[level]

const Heading = ({
  id,
  children,
  level = '1',
  weight,
  align,
  truncate,
  component,
}: HeadingProps) => (
  <StyledHeading
    id={id}
    level={level}
    weight={weight}
    align={align}
    as={component || headingTagForLevel(level)}
  >
    {children}
  </StyledHeading>
)

export default Heading
