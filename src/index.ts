import importCwd from 'import-cwd'
import { autoDiscover } from './autoDiscover'
import { tsconfig } from './paths'

// Use the tsconfig in .plop
const { compilerOptions: co1 = {} } = (importCwd.silent(tsconfig) ||
  importCwd.silent('./tsconfig.json') ||
  {}) as { compilerOptions?: object }

// Get the basic required compiler options
const { compilerOptions: co2 } = require('../tsconfig.default.json')

require('ts-node').register({
  // Overwrite any settings that might cause failure
  compilerOptions: { ...co1, ...co2 },
  transpileOnly: true,
})

export * from './types'
export default autoDiscover
