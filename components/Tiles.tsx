import React, { ReactNode } from 'react'
import toResponsiveProps, { ResponsiveProp } from '../modules/toResponsiveProps'
import { withTheme } from '@material-ui/core/styles'
import flattenChildren from 'react-keyed-flatten-children'
import styled from 'styled-components'
import SetTopMarginSpacingHack from '../components/SetTopMarginSpacingHack'
import toResponsiveBreakpoint from '../modules/toResponsiveBreakpoint'

export interface TilesProps {
  children: ReactNode
  space: ResponsiveProp<number>
  columns: ResponsiveProp<number>
}

const SetTilesSpacing = withTheme(styled.div<TilesProps>`
  flex-wrap: wrap;
  display: flex;
  ${({ space, theme }) =>
    space &&
    toResponsiveProps(space).map(
      (space, index) =>
        space &&
        `
          ${toResponsiveBreakpoint(theme, index)} {
            margin-left: ${theme.spacing(-space)}px;
          }
        `,
    )}
`)

const SetTilesItemWidth = withTheme(styled.div<TilesProps>`
  min-width: 0%;
  flex-grow: 0;
  flex-shrink: 0;
  ${({ theme, columns }) => {
    if (columns === undefined) return
    const responsiveFlexBasis = toResponsiveProps(columns).map(
      columns => 100 / columns + '%',
    )
    return responsiveFlexBasis.map(
      (flexBasis, index) =>
        flexBasis &&
        `
          ${toResponsiveBreakpoint(theme, index)} {
              flex-basis: ${flexBasis};
          }
        `,
    )
  }}
`)

const SetTilesItemSpacing = withTheme(styled.div<TilesProps>`
  height: 100%;
  ${({ space, theme }) =>
    space &&
    toResponsiveProps(space).map(
      (space, index) =>
        space &&
        `
          ${toResponsiveBreakpoint(theme, index)} {
            padding-top: ${theme.spacing(space)}px;
            padding-left: ${theme.spacing(space)}px;
          }
        `,
    )}
`)

const Tiles = ({ children: tilesItems, space, columns }: TilesProps) => (
  <SetTopMarginSpacingHack space={space}>
    <SetTilesSpacing space={space}>
      {flattenChildren(tilesItems).map((tilesItem, tileIndex) => (
        <SetTilesItemWidth key={tileIndex} columns={columns}>
          <SetTilesItemSpacing space={space}>{tilesItem}</SetTilesItemSpacing>
        </SetTilesItemWidth>
      ))}
    </SetTilesSpacing>
  </SetTopMarginSpacingHack>
)

export default Tiles
