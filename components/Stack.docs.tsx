import React, { ReactNode } from 'react'
import Box from 'components/Box'
import Stack from 'components/Stack'
import Hidden from 'components/Hidden'
import Placeholder from 'components/Placeholder'

const Container = ({ children }: { children: ReactNode }) => (
  <Box bgcolor='#ddd'>{children}</Box>
)

const docs = {
  name: 'Stack',
  examples: [
    {
      description: 'Space',
      Container,
      Example: () => (
        <Stack space={1}>
          <Placeholder height={40} />
          <Placeholder height={40} />
          <Placeholder height={40} />
        </Stack>
      ),
    },
    {
      description: 'Responsive space',
      Container,
      Example: () => (
        <Stack space={[1, 2, 3]}>
          <Placeholder height={40} />
          <Placeholder height={40} />
          <Placeholder height={40} />
        </Stack>
      ),
    },
    {
      description: 'Align to center',
      Container,
      Example: () => (
        <Stack space={1} align='center'>
          <Placeholder height={40} width={40} />
          <Placeholder height={40} width={60} />
          <Placeholder height={40} width={80} />
        </Stack>
      ),
    },
    {
      description: 'Align to right',
      Container,
      Example: () => (
        <Stack space={1} align='right'>
          <Placeholder height={40} width={40} />
          <Placeholder height={40} width={60} />
          <Placeholder height={40} width={80} />
        </Stack>
      ),
    },
    {
      description: 'Responsive alignment',
      Container,
      Example: () => (
        <Stack space={1} align={['left', 'right', 'center']}>
          <Placeholder height={40} width={40} />
          <Placeholder height={40} width={60} />
          <Placeholder height={40} width={80} />
        </Stack>
      ),
    },
    {
      description: 'Responsively hiding stack items',
      Container,
      Example: () => (
        <Stack space={1}>
          <Placeholder height={40} label='1' />
          <Hidden below='md'>
            <Placeholder height={40} label='2' />
          </Hidden>
          <Hidden above='sm'>
            <Placeholder height={40} label='3' />
          </Hidden>
          <Placeholder height={40} label='4' />
        </Stack>
      ),
    },
  ],
}

export default docs
