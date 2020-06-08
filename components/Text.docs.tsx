import React, { ReactNode } from 'react'
import Box from './Box'
import Text from './Text'

const Container = ({ children }: { children: ReactNode }) => (
  <Box bgcolor='#ddd'>{children}</Box>
)

const docs = {
  name: 'Text',
  examples: [
    {
      description: 'Standard text',
      Container,
      Example: () => <Text>Standard text.</Text>,
    },
    {
      description: 'Small text',
      Container,
      Example: () => <Text size='small'>Small text.</Text>,
    },
    {
      description: 'Large text',
      Container,
      Example: () => <Text size='large'>Large text.</Text>,
    },
    {
      description: 'Truncating long text',
      Container,
      Example: () => (
        <Box width={90}>
          <Text truncate={true}>Long piece of text</Text>
        </Box>
      ),
    },
    {
      description: 'Text alignment',
      Container,
      Example: () => <Text align='center'>Centered text</Text>,
    },
    {
      description: 'Responsive text alignment',
      Container,
      Example: () => (
        <Text align={['left', 'right', 'center']}>Centered text</Text>
      ),
    },
  ],
}

export default docs
