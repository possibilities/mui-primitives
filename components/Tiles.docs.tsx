import React, { ReactNode } from 'react'
import Placeholder from 'components/Placeholder'
import Box from 'components/Box'
import Tiles from 'components/Tiles'

const Container = ({ children }: { children: ReactNode }) => (
  <Box bgcolor='#ddd'>{children}</Box>
)

const docs = {
  name: 'Tiles',
  examples: [
    {
      description: 'Three columns',
      Container,
      Example: () => (
        <Tiles columns={3} space={2}>
          <Placeholder height={40} />
          <Placeholder height={40} />
          <Placeholder height={40} />
          <Placeholder height={40} />
          <Placeholder height={40} />
          <Placeholder height={40} />
          <Placeholder height={40} />
          <Placeholder height={40} />
          <Placeholder height={40} />
        </Tiles>
      ),
    },
    {
      description: 'Responsive columns',
      Container,
      Example: () => (
        <Tiles columns={[1, 2, 4]} space={2}>
          <Placeholder height={40} />
          <Placeholder height={40} />
          <Placeholder height={40} />
          <Placeholder height={40} />
          <Placeholder height={40} />
          <Placeholder height={40} />
          <Placeholder height={40} />
          <Placeholder height={40} />
          <Placeholder height={40} />
          <Placeholder height={40} />
          <Placeholder height={40} />
          <Placeholder height={40} />
        </Tiles>
      ),
    },
  ],
}

export default docs
