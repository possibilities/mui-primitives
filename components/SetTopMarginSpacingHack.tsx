import toResponsiveProps, { ResponsiveProp } from '../modules/toResponsiveProps'
import styled from 'styled-components'
import toResponsiveBreakpoint from '../modules/toResponsiveBreakpoint'

interface StylePropsWithSpace {
  space: ResponsiveProp<number>
}

const SetTopMarginSpacingHack = styled.div<StylePropsWithSpace>`
  padding-top: 1px;
  ${({ space, theme }) =>
    toResponsiveProps(space).map(
      (space, index) =>
        `
          ${toResponsiveBreakpoint(theme, index)} {
            &:before {
              margin-top: ${theme.spacing(-space) - 1}px;
              content: "";
              display: block;
            }
          }
        `,
    )}
`

export default SetTopMarginSpacingHack
