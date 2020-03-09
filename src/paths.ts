import { join } from 'path'

export const dotPlop = join(process.cwd(), '.plop')

export const generators = join(dotPlop, 'generators')
export const helpers = join(dotPlop, 'helpers')
export const actions = join(dotPlop, 'actions')
export const prompts = join(dotPlop, 'prompts')
export const tsconfig = join(dotPlop, 'tsconfig.json')
