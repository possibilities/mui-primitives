import React, { ReactNode } from 'react'
import Placeholder from './Placeholder'
import Box from './Box'
import Stack from './Stack'
import Column from './Column'
import Columns from './Columns'

const Container = ({ children }: { children: ReactNode }) => (
  <Box bgcolor='#ddd'>{children}</Box>
)

const docs = {
  name: 'Column',
  examples: [
    {
      description: 'standard columns',
      Container,
      Example: () => (
        <Columns space={2}>
          <Column>
            <Placeholder height={60} />
          </Column>
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
      description: 'available widths',
      Container,
      Example: () => (
        <Stack space={2}>
          <Columns space={2}>
            <Column width='content'>
              <Placeholder height={60} label='content' />
            </Column>
            <Column>
              <Placeholder height={60} label='Fluid' />
            </Column>
          </Columns>
          <Columns space={2}>
            <Column width='1/2'>
              <Placeholder height={60} label='1/2' />
            </Column>
            <Column>
              <Placeholder height={60} label='Fluid' />
            </Column>
          </Columns>
          <Columns space={2}>
            <Column width='1/3'>
              <Placeholder height={60} label='1/3' />
            </Column>
            <Column>
              <Placeholder height={60} label='Fluid' />
            </Column>
          </Columns>
          <Columns space={2}>
            <Column width='2/3'>
              <Placeholder height={60} label='2/3' />
            </Column>
            <Column>
              <Placeholder height={60} label='Fluid' />
            </Column>
          </Columns>
          <Columns space={2}>
            <Column width='1/4'>
              <Placeholder height={60} label='1/4' />
            </Column>
            <Column>
              <Placeholder height={60} label='Fluid' />
            </Column>
          </Columns>
          <Columns space={2}>
            <Column width='3/4'>
              <Placeholder height={60} label='3/4' />
            </Column>
            <Column>
              <Placeholder height={60} label='Fluid' />
            </Column>
          </Columns>
          <Columns space={2}>
            <Column width='1/5'>
              <Placeholder height={60} label='1/5' />
            </Column>
            <Column>
              <Placeholder height={60} label='Fluid' />
            </Column>
          </Columns>
          <Columns space={2}>
            <Column width='2/5'>
              <Placeholder height={60} label='2/5' />
            </Column>
            <Column>
              <Placeholder height={60} label='Fluid' />
            </Column>
          </Columns>
          <Columns space={2}>
            <Column width='3/5'>
              <Placeholder height={60} label='3/5' />
            </Column>
            <Column>
              <Placeholder height={60} label='Fluid' />
            </Column>
          </Columns>
          <Columns space={2}>
            <Column width='4/5'>
              <Placeholder height={60} label='4/5' />
            </Column>
            <Column>
              <Placeholder height={60} label='Fluid' />
            </Column>
          </Columns>
        </Stack>
      ),
    },
  ],
}

export default docs
