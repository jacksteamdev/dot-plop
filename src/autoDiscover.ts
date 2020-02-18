import { existsSync, readdirSync } from 'fs-extra'
import importCwd from 'import-cwd'
import { join } from 'path'
import { NodePlopAPI, PlopGenerator, CustomActionFunction } from 'plop'

const dotPlopPath = join(process.cwd(), '.plop')

const paths = {
  dotPlop: dotPlopPath,
  generators: join(dotPlopPath, 'generators'),
  helpers: join(dotPlopPath, 'helpers'),
  actions: join(dotPlopPath, 'actions'),
}

function loadModulesInDir<T>(dirPath: string): [string, T][] {
  return existsSync(dirPath)
    ? readdirSync(dirPath).flatMap((p) => {
        const { excluded = [], ...elements } = importCwd(p) as Record<
          string,
          T
        > & {
          excluded: string[]
        }
        delete elements.default

        return Object.entries(elements).filter(([key]) => {
          return !excluded.includes(key)
        })
      })
    : []
}

export function autoDiscover(plop: NodePlopAPI) {
  if (!existsSync(paths.dotPlop))
    throw new Error(`could not find ${paths.dotPlop}`)

  /* --------------------- LOAD GENERATORS --------------------- */

  loadModulesInDir<PlopGenerator>(paths.generators).forEach(
    ([key, generator]) => {
      plop.setGenerator(key, generator)
    },
  )

  /* ----------------------- LOAD ACTIONS ---------------------- */

  loadModulesInDir<CustomActionFunction>(paths.actions).forEach(
    ([key, actionFn]) => {
      plop.setActionType(key, actionFn)
    },
  )

  /* ----------------- LOAD HANDLEBARS HELPERS ----------------- */

  loadModulesInDir<Handlebars.HelperDelegate>(paths.helpers).forEach(
    ([key, helper]) => {
      plop.setHelper(key, helper)
    },
  )
}
