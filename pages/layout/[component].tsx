import React, { Fragment, ReactNode } from 'react'
import { GetStaticProps, InferGetStaticPropsType } from 'next'
import Head from 'next/head'
import Stack from '../../components/Stack'
import Heading from '../../components/Heading'
import Text from '../../components/Text'
import { ResponsiveProp } from '../../modules/toResponsiveProps'
import boxDocs from '../../components/Box.docs'
import columnDocs from '../../components/Column.docs'
import columnsDocs from '../../components/Columns.docs'
import hiddenDocs from '../../components/Hidden.docs'
import inlineDocs from '../../components/Inline.docs'
import stackDocs from '../../components/Stack.docs'
import tilesDocs from '../../components/Tiles.docs'
import headingDocs from '../../components/Heading.docs'
import textDocs from '../../components/Text.docs'

import codeExamples from '../../code-examples.json'

export interface TextProps {
  id?: string
  children: ReactNode
  size?: 'xsmall' | 'small' | 'standard' | 'large'
  weight?: 'regular' | 'medium' | 'strong'
  align?: ResponsiveProp<'left' | 'right' | 'center'>
  truncate?: boolean
}

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

const docs = {
  box: boxDocs,
  column: columnDocs,
  columns: columnsDocs,
  hidden: hiddenDocs,
  inline: inlineDocs,
  stack: stackDocs,
  tiles: tilesDocs,
  heading: headingDocs,
  text: textDocs,
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
    { params: { component: 'heading' } },
    { params: { component: 'text' } },
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
        <Heading level='2' component='h3'>
          {name}
        </Heading>
        {examples.map(
          (
            { Example, Container, description, code }: ExampleWithCode,
            index: number,
          ) => (
            <Fragment key={index}>
              <Stack space={2}>
                <Text>{description}</Text>
                <Container>
                  <Example />
                </Container>
                <Container>
                  <Example />
                </Container>
                <Container>
                  <Example />
                </Container>
              </Stack>
            </Fragment>
          ),
        )}
      </Stack>
    </>
  )
}

export default Docs
