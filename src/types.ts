import { NodePlopAPI, PlopGenerator } from 'plop'

export type DotPlopGenerator =
  | PlopGenerator
  | ((plop: NodePlopAPI) => PlopGenerator)
  
export type HandlebarsHelper = Parameters<NodePlopAPI['setHelper']>[1]
export type InquirerPrompt = Parameters<NodePlopAPI['setPrompt']>[1]

export * from 'plop'

