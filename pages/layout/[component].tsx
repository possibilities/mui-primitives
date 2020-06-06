import React, { Fragment, ReactNode } from 'react'
import { GetStaticProps, InferGetStaticPropsType } from 'next'
import Typography from '@material-ui/core/Typography'
import Link from '@material-ui/core/Link'
import Head from 'next/head'
import PlayIcon from '@material-ui/icons/PlayCircleOutline'
import Button from '@material-ui/core/Button'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { ghcolors } from 'react-syntax-highlighter/dist/cjs/styles/prism'

import Box from '../../components/Box'
import Stack from '../../components/Stack'

import boxDocs from '../../components/Box.docs'
import tilesDocs from '../../components/Tiles.docs'
import columnDocs from '../../components/Column.docs'
import columnsDocs from '../../components/Columns.docs'
import hiddenDocs from '../../components/Hidden.docs'
import inlineDocs from '../../components/Inline.docs'
import stackDocs from '../../components/Stack.docs'

import codeExamples from '../../code-examples.json'

interface CodeExample {
  code: string
  playroomUrl: string
}

interface ComponentDocs {
  description: string
  Example: () => JSX.Element
  Container: ({ children }: { children: ReactNode }) => JSX.Element
}

type ExampleWithCode = ComponentDocs & CodeExample

const baseUrl =
  process.env.NODE_ENV === 'development'
    ? `http://localhost:2223/`
    : `https://mui-primitives.hackart.live/playroom`

const docs = {
  box: boxDocs,
  column: columnDocs,
  columns: columnsDocs,
  hidden: hiddenDocs,
  inline: inlineDocs,
  stack: stackDocs,
  tiles: tilesDocs,
}

type DocumentedComponentName = keyof typeof docs

export const getStaticPaths = async () => {
  const paths = [
    { params: { component: 'box' } },
    { params: { component: 'column' } },
    { params: { component: 'columns' } },
    { params: { component: 'hidden' } },
    { params: { component: 'inline' } },
    { params: { component: 'stack' } },
    { params: { component: 'tiles' } },
  ]
  return { paths, fallback: false }
}

const loadComponentDocs = (componentName: string) => {
  const { name, examples: docExamples } = docs[
    componentName as DocumentedComponentName
  ]
  const examples = docExamples.map(
    (componentDocs: ComponentDocs, index: number) => ({
      ...componentDocs,
      ...codeExamples[componentName as DocumentedComponentName].examples[index],
    }),
  )
  return { name, examples }
}

export const getStaticProps: GetStaticProps = async ({ params }) => ({
  props: {
    component: params?.component,
  },
})

const Docs = ({
  component: componentName,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { name, examples } = loadComponentDocs(componentName)
  return (
    <>
      <Head>
        <title>{name}</title>
      </Head>
      <Stack space={2}>
        <Typography variant='h2'>{name}</Typography>
        {examples.map(
          (
            {
              Example,
              Container,
              description,
              code,
              playroomUrl,
            }: ExampleWithCode,
            index: number,
          ) => (
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
                  {code}
                </SyntaxHighlighter>
                <Box display='flex' justifyContent='flex-end'>
                  <Button
                    size='small'
                    component={Link}
                    target='_blank'
                    startIcon={<PlayIcon />}
                    href={baseUrl + playroomUrl}
                  >
                    Run
                  </Button>
                </Box>
              </Stack>
            </Fragment>
          ),
        )}
      </Stack>
    </>
  )
}

export default Docs
