import React, { Fragment } from 'react'
import Typography from '@material-ui/core/Typography'
import Link from '@material-ui/core/Link'
import PlayIcon from '@material-ui/icons/PlayCircleOutline'
import Button from '@material-ui/core/Button'
import Stack from 'components/Stack'
import Box from 'components/Box'
import reactElementToJsxString from 'react-element-to-jsx-string'
import prettier from 'prettier/standalone'
import typescriptParser from 'prettier/parser-typescript'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { ghcolors } from 'react-syntax-highlighter/dist/cjs/styles/prism'
import { createUrl } from 'playroom'

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

export const preRenderCodeExample = (example: Example): CodeExample => {
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

export const preRenderCodeExamplesToAvoidMinifiedExamplesInProduction = async (
  doc: Doc,
) => ({
  props: {
    codeExamples: doc.examples.map(preRenderCodeExample),
  },
})

const Doc = ({
  doc,
  codeExamples,
}: {
  doc: Doc
  codeExamples: CodeExample[]
}) => {
  return (
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
              customStyle={{ margin: 0, border: '1px solid #ddd' }}
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
  )
}

export default Doc
