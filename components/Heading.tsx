import React, { ReactNode } from 'react'
import styled from 'styled-components'
import toResponsiveProps, { ResponsiveProp } from '../modules/toResponsiveProps'
import toResponsiveBreakpoint from '../modules/toResponsiveBreakpoint'
import { Theme } from '@material-ui/core/styles'

type HeadingLevel = '1' | '2' | '3' | '4'
type HeadingTag = 'h1' | 'h2' | 'h3' | 'h4'

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
}

const fontSizes = {
  '1': 28,
  '2': 21,
  '3': 21,
  '4': 18,
}

const lineHeights = {
  '1': 36,
  '2': 32,
  '3': 28,
  '4': 28,
}

const fontWeights = {
  regular: 500,
  weak: 400,
}

const fontSize = ({ level }: HeadingProps) =>
  `font-size: ${fontSizes[level]}px;`

const lineHeight = ({ level }: HeadingProps) =>
  `line-height: ${lineHeights[level]}px;`

const fontWeight = ({ weight = 'regular' }: HeadingProps) =>
  `font-weight: ${fontWeights[weight]};`

const truncateWithEllipses = ({ truncate }: HeadingProps) =>
  truncate &&
  `
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  `

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
  ${fontSize}
  ${lineHeight}
  ${fontWeight}
  ${textAlign}
  ${truncateWithEllipses}
`

const headingTagForLevel = (level: HeadingLevel): HeadingTag =>
  levelToHeadingTag[level]

const Heading = ({
  id,
  children,
  level,
  weight,
  align,
  truncate,
}: HeadingProps) => (
  <StyledHeading
    id={id}
    level={level}
    weight={weight}
    align={align}
    truncate={truncate}
    as={headingTagForLevel(level)}
  >
    {children}
  </StyledHeading>
)

export default Heading
