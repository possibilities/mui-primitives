import React, { Fragment, ReactNode } from 'react'
import { GetStaticProps, InferGetStaticPropsType } from 'next'
import styled from 'styled-components'
import Link from '@material-ui/core/Link'
import Head from 'next/head'
import PlayIcon from '@material-ui/icons/PlayCircleOutline'
import Button from '@material-ui/core/Button'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { ghcolors } from 'react-syntax-highlighter/dist/cjs/styles/prism'
import Box from '../../components/Box'
import Stack from '../../components/Stack'
import Heading from '../../components/Heading'
import Text from '../../components/Text'
import toResponsiveProps, {
  ResponsiveProp,
} from '../../modules/toResponsiveProps'
import { Theme } from '@material-ui/core/styles'

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

interface BaseKickOptions {
  typeSizeModifier: number
  baseFontSize: number
  descenderHeightScale: number
  capHeight: number
  typeRowSpan: number
  gridRowHeight: number
}

const basekick = ({
  typeSizeModifier,
  baseFontSize,
  descenderHeightScale,
  typeRowSpan,
  gridRowHeight,
  capHeight,
}: BaseKickOptions) => {
  const fontSize = typeSizeModifier * baseFontSize

  const calculateTypeOffset = (lh: number) => {
    const lineHeightScale = lh / fontSize
    return (lineHeightScale - 1) / 2 + descenderHeightScale
  }

  const lineHeight = typeRowSpan * gridRowHeight
  const typeOffset = calculateTypeOffset(lineHeight)

  const topSpace = lineHeight - capHeight * fontSize
  const heightCorrection =
    topSpace > gridRowHeight ? topSpace - (topSpace % gridRowHeight) : 0

  const preventCollapse = 1

  return {
    fontSize,
    lineHeight,
    typeOffset,
    preventCollapse,
    heightCorrection,
  }
}

interface TextDefinition {
  rows: number
  size: number
}

export interface TextProps {
  id?: string
  children: ReactNode
  size?: 'xsmall' | 'small' | 'standard' | 'large'
  weight?: 'regular' | 'medium' | 'strong'
  align?: ResponsiveProp<'left' | 'right' | 'center'>
  truncate?: boolean
}

const fontStyles = ({ theme }: { theme: Theme }) => {
  const size = 'standard'
  // TODO do mobile also
  const tablet = basekick({
    baseFontSize: 1,
    typeSizeModifier: theme.treat.typography.text[size].tablet.size,
    typeRowSpan: theme.treat.typography.text[size].tablet.rows,
    gridRowHeight: theme.treat.grid,
    descenderHeightScale: theme.treat.typography.descenderHeightScale,
    capHeight: theme.treat.typography.capHeightScale,
  })
  return `
    font-family: ${theme.treat.typography.fontFamily};
    font-size: ${tablet.fontSize}px;
    letter-spacing: normal;
    line-height: ${tablet.lineHeight}px;
    transform: translateY(${tablet.typeOffset}em);
    padding-top: ${tablet.preventCollapse}px;
    &::before {
      content: "";
      margin-top: -${tablet.heightCorrection + tablet.preventCollapse}px;
      display: block;
      height: 0;
    }
  `
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

const StyledCodeWrapper = styled.div<TextProps>`
  .codeLine {
    ${fontStyles}
  }
`

const Docs = ({
  component: componentName,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { name, examples } = loadComponentDocs(componentName)
  return (
    <>
      <Head>
        <title>{name}</title>
      </Head>
      <Stack space={4}>
        <Heading level='2' component='h3'>
          {name}
        </Heading>
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
              <Stack space={2}>
                <Text>{description}</Text>
                <Container>
                  <Example />
                </Container>
                <Container>
                  <Example />
                </Container>
                <StyledCodeWrapper>
                  <SyntaxHighlighter
                    lineProps={{ className: 'codeLine' }}
                    wrapLines
                    language='tsx'
                    style={ghcolors}
                    customStyle={{
                      overflow: 'visible',
                      background: '#ddd',
                      padding: 0,
                      margin: 'initial',
                      border: 0,
                    }}
                  >
                    {code}
                  </SyntaxHighlighter>
                </StyledCodeWrapper>
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
