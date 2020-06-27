import React from 'react'

import Link from './Link'
import Stack from '../Stack'
import Text from '../Text'

const Navigation = () => (
  <Stack space={2}>
    <Text size='small' weight='strong'>
      Layout
    </Text>
    <Link href='/layout/[component]' as='/layout/box'>
      Box
    </Link>
    <Link href='/layout/[component]' as='/layout/column'>
      Column
    </Link>
    <Link href='/layout/[component]' as='/layout/columns'>
      Columns
    </Link>
    <Link href='/layout/[component]' as='/layout/hidden'>
      Hidden
    </Link>
    <Link href='/layout/[component]' as='/layout/inline'>
      Inline
    </Link>
    <Link href='/layout/[component]' as='/layout/stack'>
      Stack
    </Link>
    <Link href='/layout/[component]' as='/layout/tiles'>
      Tiles
    </Link>
    <Text size='small' weight='strong'>
      Typography
    </Text>
    <Link href='/layout/[component]' as='/layout/heading'>
      Heading
    </Link>
    <Link href='/layout/[component]' as='/layout/text'>
      Text
    </Link>
  </Stack>
)

export default Navigation
