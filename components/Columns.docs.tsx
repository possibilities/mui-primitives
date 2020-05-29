import React, { ReactNode } from 'react'
import Placeholder from 'components/Placeholder'
import Box from 'components/Box'
import Column from 'components/Column'
import Columns from 'components/Columns'

const Container = ({ children }: { children: ReactNode }) => (
  <Box bgcolor='#ddd'>{children}</Box>
)

const docs = {
  name: 'Columns',
  examples: [
    {
      description: 'No space',
      Container,
      Example: () => (
        <Columns>
          <Column>
            <Placeholder height={60} />
          </Column>
          <Column>
            <Placeholder height={60} />
          </Column>
        </Columns>
      ),
    },
    {
      description: 'Custom space',
      Container,
      Example: () => (
        <Columns space={2}>
          <Column>
            <Placeholder height={60} />
          </Column>
          <Column>
            <Placeholder height={60} />
          </Column>
        </Columns>
      ),
    },
    {
      description: 'Responsive space',
      Container,
      Example: () => (
        <Columns space={[2, 3, 4]}>
          <Column>
            <Placeholder height={60} />
          </Column>
          <Column>
            <Placeholder height={60} />
          </Column>
        </Columns>
      ),
    },
    {
      description: 'Vertically align to center',
      Container,
      Example: () => (
        <Columns alignY='center' space={2}>
          <Column>
            <Placeholder height={60} />
          </Column>
          <Column>
            <Placeholder height={100} />
          </Column>
        </Columns>
      ),
    },
    {
      description: 'Vertically align to top',
      Container,
      Example: () => (
        <Columns alignY='top' space={2}>
          <Column>
            <Placeholder height={60} />
          </Column>
          <Column>
            <Placeholder height={100} />
          </Column>
        </Columns>
      ),
    },
    {
      description: 'Vertically align to bottom',
      Container,
      Example: () => (
        <Columns alignY='bottom' space={2}>
          <Column>
            <Placeholder height={60} />
          </Column>
          <Column>
            <Placeholder height={100} />
          </Column>
        </Columns>
      ),
    },

    {
      description: 'Responsive alignment',
      Container,
      Example: () => (
        <Columns alignY={['bottom', 'center', 'top']} space={2}>
          <Column>
            <Placeholder height={60} />
          </Column>
          <Column>
            <Placeholder height={100} />
          </Column>
        </Columns>
      ),
    },
    {
      description: 'Collapse below md',
      Container,
      Example: () => (
        <Columns collapseBelow='md' space={2}>
          <Column>
            <Placeholder height={60} label='First' />
          </Column>
          <Column>
            <Placeholder height={60} label='Second' />
          </Column>
        </Columns>
      ),
    },
    {
      description: 'Collapse below lg',
      Container,
      Example: () => (
        <Columns collapseBelow='lg' space={2}>
          <Column>
            <Placeholder height={60} label='First' />
          </Column>
          <Column>
            <Placeholder height={60} label='Second' />
          </Column>
        </Columns>
      ),
    },
    {
      description: 'Collapse below md with responsive space',
      Container,
      Example: () => (
        <Columns collapseBelow='md' space={[2, 3, 4]}>
          <Column>
            <Placeholder height={60} label='First' />
          </Column>
          <Column>
            <Placeholder height={60} label='Second' />
          </Column>
        </Columns>
      ),
    },
    {
      description: 'Reverse',
      Container,
      Example: () => (
        <Columns reverse space={2}>
          <Column>
            <Placeholder height={60} label='First' />
          </Column>
          <Column>
            <Placeholder height={60} label='Second' />
          </Column>
        </Columns>
      ),
    },
  ],
}

export default docs
