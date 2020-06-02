import React from 'react'
import Text from '../components/Text'
import Link from '@material-ui/core/Link'
import Stack from '../components/Stack'

const Page = () => (
  <Stack space={2}>
    <Text size='small'>
      <Link href='https://seek-oss.github.io/braid-design-system/'>Braid</Link>{' '}
      concepts and components implemented with{' '}
      <Link href='https://material-ui.com/'>Material UI</Link>
    </Text>
  </Stack>
)

export default Page
