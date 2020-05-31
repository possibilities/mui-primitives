import React, { ReactNode } from 'react'
import Box from './Box'
import Inline from './Inline'
import Placeholder from './Placeholder'

const Container = ({ children }: { children: ReactNode }) => (
  <Box bgcolor='#ddd' maxWidth={240}>
    {children}
  </Box>
)

const docs = {
  name: 'Inline',
  examples: [
    {
      description: 'Basic example',
      Container,
      Example: () => (
        <Inline space={1}>
          <Placeholder height={48} width={48} />
          <Placeholder height={48} width={48} />
          <Placeholder height={48} width={48} />
          <Placeholder height={48} width={48} />
          <Placeholder height={48} width={48} />
          <Placeholder height={48} width={48} />
          <Placeholder height={48} width={48} />
          <Placeholder height={48} width={48} />
          <Placeholder height={48} width={48} />
          <Placeholder height={48} width={48} />
        </Inline>
      ),
    },
    {
      description: 'Responsive space',
      Container,
      Example: () => (
        <Inline space={[1, 2, 3]}>
          <Placeholder height={48} width={48} />
          <Placeholder height={48} width={48} />
          <Placeholder height={48} width={48} />
          <Placeholder height={48} width={48} />
          <Placeholder height={48} width={48} />
          <Placeholder height={48} width={48} />
          <Placeholder height={48} width={48} />
          <Placeholder height={48} width={48} />
          <Placeholder height={48} width={48} />
          <Placeholder height={48} width={48} />
        </Inline>
      ),
    },
    {
      description: 'Align horizontally to center',
      Container,
      Example: () => (
        <Inline align='center' space={1}>
          <Placeholder height={48} width={48} />
          <Placeholder height={48} width={48} />
          <Placeholder height={48} width={48} />
          <Placeholder height={48} width={48} />
          <Placeholder height={48} width={48} />
          <Placeholder height={48} width={48} />
          <Placeholder height={48} width={48} />
          <Placeholder height={48} width={48} />
          <Placeholder height={48} width={48} />
          <Placeholder height={48} width={48} />
        </Inline>
      ),
    },
    {
      description: 'Align horizontally to right',
      Container,
      Example: () => (
        <Inline align='right' space={1}>
          <Placeholder height={48} width={48} />
          <Placeholder height={48} width={48} />
          <Placeholder height={48} width={48} />
          <Placeholder height={48} width={48} />
          <Placeholder height={48} width={48} />
          <Placeholder height={48} width={48} />
          <Placeholder height={48} width={48} />
          <Placeholder height={48} width={48} />
          <Placeholder height={48} width={48} />
          <Placeholder height={48} width={48} />
        </Inline>
      ),
    },

    {
      description: 'Responsive alignment',
      Container,
      Example: () => (
        <Inline align={['left', 'right', 'center']} space={1}>
          <Placeholder height={48} width={48} />
          <Placeholder height={48} width={48} />
          <Placeholder height={48} width={48} />
          <Placeholder height={48} width={48} />
          <Placeholder height={48} width={48} />
          <Placeholder height={48} width={48} />
          <Placeholder height={48} width={48} />
          <Placeholder height={48} width={48} />
          <Placeholder height={48} width={48} />
          <Placeholder height={48} width={48} />
        </Inline>
      ),
    },
    {
      description: 'Align vertically',
      Container,
      Example: () => (
        <Inline alignY='center' space={1}>
          <Placeholder height={40} width={48} />
          <Placeholder height={100} width={48} />
          <Placeholder height={60} width={48} />
        </Inline>
      ),
    },

    {
      description: 'Collapse below md',
      Container,
      Example: () => (
        <Inline collapseBelow='md' space={1}>
          <Placeholder height={48} width={48} />
          <Placeholder height={48} width={48} />
          <Placeholder height={48} width={48} />
          <Placeholder height={48} width={48} />
          <Placeholder height={48} width={48} />
          <Placeholder height={48} width={48} />
        </Inline>
      ),
    },
    {
      description: 'Collapse below lg',
      Container,
      Example: () => (
        <Inline collapseBelow='lg' space={1}>
          <Placeholder height={48} width={48} />
          <Placeholder height={48} width={48} />
          <Placeholder height={48} width={48} />
          <Placeholder height={48} width={48} />
          <Placeholder height={48} width={48} />
          <Placeholder height={48} width={48} />
        </Inline>
      ),
    },

    {
      description: 'Collapse below md with responsive space',
      Container,
      Example: () => (
        <Inline collapseBelow='md' space={[1, 2, 3]}>
          <Placeholder height={48} width={48} />
          <Placeholder height={48} width={48} />
          <Placeholder height={48} width={48} />
          <Placeholder height={48} width={48} />
          <Placeholder height={48} width={48} />
          <Placeholder height={48} width={48} />
        </Inline>
      ),
    },
    {
      description: 'Collapse below md with alignment',
      Container,
      Example: () => (
        <Inline collapseBelow='md' align='center' space={1}>
          <Placeholder height={48} width={48} />
          <Placeholder height={48} width={48} />
          <Placeholder height={48} width={48} />
          <Placeholder height={48} width={48} />
          <Placeholder height={48} width={48} />
          <Placeholder height={48} width={48} />
        </Inline>
      ),
    },
  ],
}

export default docs
