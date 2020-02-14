import { NodePlopAPI } from 'plop'
import autoDiscoverGenerators from './autoDiscoverGenerators'

const { compilerOptions } = require('../tsconfig.json')

require('ts-node').register({
  compilerOptions,
  transpileOnly: true,
})

module.exports = function(plop: NodePlopAPI) {
  autoDiscoverGenerators(plop)
}
