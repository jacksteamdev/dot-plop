import { autoDiscover } from './autoDiscover'

const { compilerOptions } = require('../tsconfig.json')

require('ts-node').register({
  compilerOptions,
  transpileOnly: true,
})

module.exports = autoDiscover
