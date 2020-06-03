import React, { Fragment, ReactNode } from 'react'
import Typography from '@material-ui/core/Typography'
import Link from '@material-ui/core/Link'
import Head from 'next/head'
import PlayIcon from '@material-ui/icons/PlayCircleOutline'
import Button from '@material-ui/core/Button'
import Stack from '../Stack'
import Box from '../Box'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { ghcolors } from 'react-syntax-highlighter/dist/cjs/styles/prism'

export interface Doc {
  name: string
  examples: Example[]
}

export interface Example {
  description: string
  Example: () => JSX.Element
  Container: ({ children }: { children: ReactNode }) => JSX.Element
}

export interface Code {
  code: string
  playroomUrl: string
}

const Doc = ({ doc, codeExamples }: { doc: Doc; codeExamples: Code[] }) => (
  <>
    <Head>
      <title>{doc.name} | MUI Primitives</title>
    </Head>
    <Stack space={2}>
      <Typography variant='h2'>{doc.name}</Typography>
      {doc.examples.map(({ Example, Container, description }, index) => (
        <Fragment key={index}>
          <Typography variant='body1'>{description}</Typography>
          <Container>
            <Example />
          </Container>
          <Stack space={1}>
            <SyntaxHighlighter
              language='javascript'
              style={ghcolors}
              customStyle={{
                fontSize: '1.2em',
                lineHeight: '1.8em',
                margin: 0,
                border: '1px solid #ddd',
              }}
            >
              {codeExamples[index].code}
            </SyntaxHighlighter>
            <Box display='flex' justifyContent='flex-end'>
              <Button
                size='small'
                component={Link}
                target='_blank'
                startIcon={<PlayIcon />}
                href={codeExamples[index].playroomUrl}
              >
                Run
              </Button>
            </Box>
          </Stack>
        </Fragment>
      ))}
    </Stack>
  </>
)

export default Doc
