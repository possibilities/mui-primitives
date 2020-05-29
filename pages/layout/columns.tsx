import React from 'react'
import Doc, {
  preRenderCodeExamplesToAvoidMinifiedExamplesInProduction,
} from 'components/demo/Doc'
import doc from 'components/Columns.docs'

export const getStaticProps = async () =>
  preRenderCodeExamplesToAvoidMinifiedExamplesInProduction(doc)

export default ({ codeExamples }: { codeExamples: CodeExample[] }) => (
  <Doc doc={doc} codeExamples={codeExamples} />
)
