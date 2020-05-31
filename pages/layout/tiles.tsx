import React from 'react'
import Doc, {
  Code,
  preRenderCodeExamplesToAvoidMinifiedExamplesInProduction,
} from '../../components/demo/Doc'
import doc from '../../components/Tiles.docs'

export const getStaticProps = async () =>
  preRenderCodeExamplesToAvoidMinifiedExamplesInProduction(doc)

export default ({ codeExamples }: { codeExamples: Code[] }) => (
  <Doc doc={doc} codeExamples={codeExamples} />
)
