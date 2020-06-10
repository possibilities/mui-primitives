import React, { ReactNode } from 'react'
import reactElementToJsxString from 'react-element-to-jsx-string'
import prettier from 'prettier/standalone'
import typescriptParser from 'prettier/parser-typescript'
import { createUrl } from 'playroom'
import boxDocs from './components/Box.docs'
import columnDocs from './components/Column.docs'
import columnsDocs from './components/Columns.docs'
import hiddenDocs from './components/Hidden.docs'
import inlineDocs from './components/Inline.docs'
import stackDocs from './components/Stack.docs'
import tilesDocs from './components/Tiles.docs'
import headingDocs from './components/Heading.docs'
import textDocs from './components/Text.docs'

export interface ComponentDocs {
  description: string
  Example: () => JSX.Element
  Container: ({ children }: { children: ReactNode }) => JSX.Element
}

export interface Doc {
  name: string
  examples: ComponentDocs[]
}

const docs: Record<string, Doc> = {
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

const usePrettierToFormatSnippet = (snippet: string) =>
  prettier
    .format(snippet, {
      parser: 'typescript',
      plugins: [typescriptParser],
      semi: false,
      jsxSingleQuote: true,
    })
    .replace(/^;/, '')
    .trim()

const preRenderCodeExample = (componentDocs: ComponentDocs) => {
  const code = usePrettierToFormatSnippet(
    reactElementToJsxString(componentDocs.Example(), {
      useBooleanShorthandSyntax: true,
    }),
  )
  return {
    code,
    playroomUrl: createUrl({ code, baseUrl: '/' }).replace('/#', '#'),
  }
}

const examplesJson = JSON.stringify(
  Object.fromEntries(
    Object.keys(docs).map((docName: string) => {
      const doc = docs[docName]
      const examples = doc.examples.map((componentDocs: ComponentDocs) => {
        const { code, playroomUrl } = preRenderCodeExample(componentDocs)
        return {
          code,
          playroomUrl,
        }
      })
      return [docName, { name: doc.name, examples }]
    }),
  ),
  null,
  2,
)

console.info(examplesJson)
