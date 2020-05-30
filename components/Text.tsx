import React, { ReactNode } from 'react'
import Typography from '@material-ui/core/Typography'

interface TextProps {
  children: ReactNode
  size?: 'small' | 'standard'
}

const Text = ({ children, size = 'standard' }: TextProps) => (
  <Typography variant={size === 'standard' ? 'body1' : 'body2'}>
    {children}
  </Typography>
)

export default Text
