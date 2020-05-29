import React from 'react'

import Link from 'components/Link'
import Stack from 'components/Stack'

const Navigation = () => (
  <Stack space={2}>
    <Link href='/layout/box'>Box</Link>
    <Link href='/layout/column'>Column</Link>
    <Link href='/layout/columns'>Columns</Link>
    <Link href='/layout/hidden'>Hidden</Link>
    <Link href='/layout/inline'>Inline</Link>
    <Link href='/layout/stack'>Stack</Link>
    <Link href='/layout/tiles'>Tiles</Link>
  </Stack>
)

export default Navigation
