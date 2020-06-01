#!/usr/bin/env node
// See: https://github.com/possibilities/mui-primitives/pull/3#issue-425668524
const getStaticTypes = require('playroom/lib/getStaticTypes')
const generateStaticTypes = async () =>
  console.info(JSON.stringify(await getStaticTypes({
    typeScriptFiles: ['./components/*.tsx'],
    filterProps: ['className', 'children', 'css'],
  }), null, 2))
generateStaticTypes()
