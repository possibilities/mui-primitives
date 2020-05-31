export type AlignProp = 'center' | 'left' | 'right'

const alignPropToFlexboxAlign = {
  center: 'center',
  left: 'flex-start',
  right: 'flex-end',
}

const getFlexboxAlignForAlignProp = (align: AlignProp) =>
  alignPropToFlexboxAlign[align]

export default getFlexboxAlignForAlignProp
