import React, { ReactNode } from 'react'
import Typography from '@material-ui/core/Typography'
import Box from 'components/Box'
import Stack from 'components/Stack'
import Hidden from 'components/Hidden'

const Container = ({ children }: { children: ReactNode }) => (
  <Box bgcolor='#ddd'>{children}</Box>
)

interface TextProps {
  children: ReactNode
  size?: 'small' | 'standard'
}

const Text = ({ children, size = 'standard' }: TextProps) => (
  <Typography variant={size === 'standard' ? 'body1' : 'body2'}>
    {children}
  </Typography>
)

const docs = {
  name: 'Hidden',
  examples: [
    {
      description: 'Hidden below md',
      Container,
      Example: () => (
        <Stack space={2}>
          <Text size='small'>The following line is hidden below md:</Text>
          <Hidden below='md'>
            <Text size='small'>Hidden below md.</Text>
          </Hidden>
        </Stack>
      ),
    },
    {
      description: 'Hidden below lg',
      Container,
      Example: () => (
        <Stack space={2}>
          <Text size='small'>The following line is hidden below lg:</Text>
          <Hidden below='lg'>
            <Text size='small'>Hidden below lg.</Text>
          </Hidden>
        </Stack>
      ),
    },
    {
      description: 'Hidden above sm',
      Container,
      Example: () => (
        <Stack space={2}>
          <Text size='small'>The following line is hidden above sm:</Text>
          <Hidden above='sm'>
            <Text size='small'>Hidden above sm.</Text>
          </Hidden>
        </Stack>
      ),
    },
    {
      description: 'Hidden above md',
      Container,
      Example: () => (
        <Stack space={2}>
          <Text size='small'>The following line is hidden above md:</Text>
          <Hidden above='md'>
            <Text size='small'>Hidden above md.</Text>
          </Hidden>
        </Stack>
      ),
    },
    {
      description: 'Hidden below md (inline)',
      Container,
      Example: () => (
        <Text size='small'>
          The following text is hidden below md:{' '}
          <Hidden below='md' inline>
            Hidden below md.
          </Hidden>
        </Text>
      ),
    },
    {
      description: 'Hidden below lg (inline)',
      Container,
      Example: () => (
        <Text size='small'>
          The following text is hidden below lg:{' '}
          <Hidden below='lg' inline>
            Hidden below lg.
          </Hidden>
        </Text>
      ),
    },

    {
      description: 'Hidden above sm (inline)',
      Container,
      Example: () => (
        <Text size='small'>
          The following text is hidden above sm:{' '}
          <Hidden above='sm' inline>
            Hidden above sm.
          </Hidden>
        </Text>
      ),
    },
    {
      description: 'Hidden above md (inline)',
      Container,
      Example: () => (
        <Text size='small'>
          The following text is hidden above md:{' '}
          <Hidden above='md' inline>
            Hidden above md.
          </Hidden>
        </Text>
      ),
    },
  ],
}

export default docs
