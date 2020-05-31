import React, { ReactNode } from 'react'
import Box from './Box'
import Placeholder from './Placeholder'

const Container = ({ children }: { children: ReactNode }) => (
  <Box bgcolor='#ddd' width={300}>
    {children}
  </Box>
)

const docs = {
  name: 'Box',
  examples: [
    {
      description: 'No padding',
      Container,
      Example: () => (
        <Box>
          <Placeholder height={40} />
        </Box>
      ),
    },
    {
      description: 'With padding',
      Container,
      Example: () => (
        <Box padding={2}>
          <Placeholder height={40} />
        </Box>
      ),
    },
    {
      description: 'Responsive padding',
      Container,
      Example: () => (
        <Box padding={[2, 3, 4]}>
          <Placeholder height={40} />
        </Box>
      ),
    },
  ],
}

export default docs
