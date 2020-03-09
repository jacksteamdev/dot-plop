import { NodePlopAPI } from 'plop'

export type HandlebarsHelper = Parameters<NodePlopAPI['setHelper']>[1]
export type InquirerPrompt = Parameters<NodePlopAPI['setPrompt']>[1]

export * from 'plop'

