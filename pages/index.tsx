import React from 'react'
import Typography from '@material-ui/core/Typography'
import Link from '@material-ui/core/Link'
import Stack from 'components/Stack'

const Page = ({ foo }: { foo: string }) => (
  <Stack space={2}>
    {foo}
    <Typography variant='body2'>
      Primitive components for{' '}
      <Link href='https://material-ui.com/system/basics/'>Material-UI</Link>.
    </Typography>
    <Typography variant='body2'>
      Concepts and component interfaces are copied directly from{' '}
      <Link href='https://github.com/seek-oss/braid-design-system'>Braid</Link>{' '}
      but altered to adopt Material-UI semantics.
    </Typography>
  </Stack>
)

export default Page
