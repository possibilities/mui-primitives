import React from 'react'

import Link from './Link'
import Stack from '../Stack'

const Navigation = () => (
  <Stack space={2}>
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
  </Stack>
)

export default Navigation
