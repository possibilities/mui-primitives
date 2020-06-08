import React, { ReactNode } from 'react'
import Box from './Box'
import Heading from './Heading'

const Container = ({ children }: { children: ReactNode }) => (
  <Box bgcolor='#ddd'>{children}</Box>
)

const docs = {
  name: 'Heading',
  examples: [
    {
      description: 'Level 1',
      Container,
      Example: () => <Heading level='1'>Heading Level 1</Heading>,
    },
    {
      description: 'Level 1 weak',
      Container,
      Example: () => (
        <Heading level='1' weight='weak'>
          Heading Level 1
        </Heading>
      ),
    },
    {
      description: 'Level 2',
      Container,
      Example: () => <Heading level='2'>Heading Level 2</Heading>,
    },
    {
      description: 'Level 2 weak',
      Container,
      Example: () => (
        <Heading level='2' weight='weak'>
          Heading Level 2
        </Heading>
      ),
    },
    {
      description: 'Level 3',
      Container,
      Example: () => <Heading level='3'>Heading Level 3</Heading>,
    },
    {
      description: 'Level 3 weak',
      Container,
      Example: () => (
        <Heading level='3' weight='weak'>
          Heading Level 3
        </Heading>
      ),
    },
    {
      description: 'Level 4',
      Container,
      Example: () => <Heading level='4'>Heading Level 4</Heading>,
    },
    {
      description: 'Level 4 weak',
      Container,
      Example: () => (
        <Heading level='4' weight='weak'>
          Heading Level 4
        </Heading>
      ),
    },
    {
      description: 'Truncating long heading',
      Container,
      Example: () => (
        <Box width={90}>
          <Heading level='3' truncate={true}>
            Long heading text
          </Heading>
        </Box>
      ),
    },
    {
      description: 'Heading alignment',
      Container,
      Example: () => (
        <Heading level='3' align='center'>
          Centered heading
        </Heading>
      ),
    },
    {
      description: 'Responsive heading alignment',
      Container,
      Example: () => (
        <Heading level='3' align={['left', 'right', 'center']}>
          Centered heading
        </Heading>
      ),
    },
  ],
}

export default docs
