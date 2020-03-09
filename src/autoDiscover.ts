import { existsSync, readdirSync } from 'fs-extra'
import importCwd from 'import-cwd'
import { join } from 'path'
import * as paths from './paths'
import { CustomActionFunction, HandlebarsHelper, InquirerPrompt, NodePlopAPI, PlopGenerator } from './types'

function loadModulesInDir<T>(dirPath: string): [string, T][] {
  return existsSync(dirPath)
    ? readdirSync(dirPath).flatMap((p) => {
        const { excluded = [], ...elements } = importCwd(
          join(dirPath, p),
        ) as Record<string, T> & {
          excluded: string[]
        }
        delete elements.default

        return Object.entries(elements).filter(([key]) => {
          return !excluded.includes(key)
        })
      })
    : []
}

export function autoDiscover(plop: NodePlopAPI): void {
  if (!existsSync(paths.dotPlop))
    throw new Error(`could not find ${paths.dotPlop}`)

  /* --------------------- LOAD GENERATORS --------------------- */

  loadModulesInDir<PlopGenerator>(paths.generators).forEach(
    ([key, generator]) => {
      plop.setGenerator(key, callIfFn(generator))
    },
  )

  /* ----------------------- LOAD ACTIONS ---------------------- */

  loadModulesInDir<CustomActionFunction>(paths.actions).forEach(
    ([key, actionFn]) => {
      plop.setActionType(key, actionFn)
    },
  )

  /* ----------------- LOAD HANDLEBARS HELPERS ----------------- */

  loadModulesInDir<HandlebarsHelper>(paths.helpers).forEach(([key, helper]) => {
    plop.setHelper(key, helper)
  })

  /* ------------------- LOAD INQUIRER PROMPT ------------------ */

  loadModulesInDir<InquirerPrompt>(paths.prompts).forEach(([key, prompt]) => {
    plop.setPrompt(key, prompt)
  })

  /* ------------------------ FUNCTIONS ------------------------ */

  function callIfFn(value: any) {
    if (typeof value === 'function') {
      return value(plop)
    } else {
      return value
    }
  }
}
