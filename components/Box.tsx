import React from 'react'
import MuiBox, { BoxProps as BoxPropsType } from '@material-ui/core/Box'

export type BoxProps = BoxPropsType
const Box = (props: BoxProps) => <MuiBox {...props} />

export default Box
