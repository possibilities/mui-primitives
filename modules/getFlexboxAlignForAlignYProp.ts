export type AlignYProp = 'center' | 'top' | 'bottom'

const alignYPropToFlexboxAlign = {
  center: 'center',
  top: 'flex-start',
  bottom: 'flex-end',
}

const getFlexboxAlignForAlignYProp = (alignY: AlignYProp) =>
  alignYPropToFlexboxAlign[alignY]

export default getFlexboxAlignForAlignYProp
