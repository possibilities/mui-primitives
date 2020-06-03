import React from 'react'
import { GetStaticProps, InferGetStaticPropsType } from 'next'
import reactElementToJsxString from 'react-element-to-jsx-string'
import prettier from 'prettier/standalone'
import typescriptParser from 'prettier/parser-typescript'
import { createUrl } from 'playroom'
import Doc, { Code, Example } from '../../components/demo/Doc'
import Box from '../../components/Box.docs'
import Tiles from '../../components/Tiles.docs'
import Column from '../../components/Column.docs'
import Columns from '../../components/Columns.docs'
import Hidden from '../../components/Hidden.docs'
import Inline from '../../components/Inline.docs'
import Stack from '../../components/Stack.docs'

const baseUrl =
  process.env.NODE_ENV === 'development'
    ? `http://localhost:2223/`
    : `https://mui-primitives.hackart.live/playroom`

const usePrettierToFormatSnippet = (snippet: string) =>
  prettier
    .format(snippet, {
      parser: 'typescript',
      plugins: [typescriptParser],
      semi: false,
    })
    .replace(/^;/, '')

export const preRenderCodeExample = (example: Example): Code => {
  const code = usePrettierToFormatSnippet(
    reactElementToJsxString(example.Example(), {
      useBooleanShorthandSyntax: true,
    }),
  )
  return {
    code,
    playroomUrl: createUrl({ code, baseUrl }).replace('/#', '#'),
  }
}

const docs = {
  box: Box,
  column: Column,
  columns: Columns,
  hidden: Hidden,
  inline: Inline,
  stack: Stack,
  tiles: Tiles,
}

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

type ComponentType = keyof typeof docs

export const getStaticProps: GetStaticProps = async ({ params }) => ({
  props: {
    component: params?.component,
    codeExamples: docs[params?.component as ComponentType].examples.map(
      preRenderCodeExample,
    ),
  },
})

const Docs = ({
  codeExamples,
  component,
}: InferGetStaticPropsType<typeof getStaticProps>) => (
  <Doc codeExamples={codeExamples} doc={docs[component as ComponentType]} />
)

export default Docs
