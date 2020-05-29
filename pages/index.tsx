import React from 'react'
import Typography from '@material-ui/core/Typography'
import Link from '@material-ui/core/Link'
import Stack from 'components/Stack'

const Page = () => (
  <Stack space={2}>
    <Typography variant='body2'>
      <Link href='https://seek-oss.github.io/braid-design-system/'>Braid</Link>{' '}
      concepts and components implemented with{' '}
      <Link href='https://material-ui.com/'>Material UI</Link>
    </Typography>
  </Stack>
)

export default Page
