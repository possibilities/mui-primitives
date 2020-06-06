import React, { ReactNode } from 'react'
import reactElementToJsxString from 'react-element-to-jsx-string'
import prettier from 'prettier/standalone'
import typescriptParser from 'prettier/parser-typescript'
import { createUrl } from 'playroom'

import boxDocs from './components/Box.docs'
import tilesDocs from './components/Tiles.docs'
import columnDocs from './components/Column.docs'
import columnsDocs from './components/Columns.docs'
import hiddenDocs from './components/Hidden.docs'
import inlineDocs from './components/Inline.docs'
import stackDocs from './components/Stack.docs'

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
  tiles: tilesDocs,
  column: columnDocs,
  columns: columnsDocs,
  hidden: hiddenDocs,
  inline: inlineDocs,
  stack: stackDocs,
}

const usePrettierToFormatSnippet = (snippet: string) =>
  prettier
    .format(snippet, {
      parser: 'typescript',
      plugins: [typescriptParser],
      semi: false,
    })
    .replace(/^;/, '')

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

console.info(
  JSON.stringify(
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
  ),
)
