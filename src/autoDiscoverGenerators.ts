import { readdirSync, existsSync, lstatSync } from 'fs-extra'
import importCwd from 'import-cwd'
import { join } from 'path'
import { NodePlopAPI, PlopGenerator } from 'plop'

function findFolder(find: string | RegExp, level = 0) {
  return (basepath: string): string | string[] => {
    if (!lstatSync(basepath).isDirectory()) {
      return []
    } else if (
      find instanceof RegExp ? find.test(basepath) : basepath.includes(find)
    ) {
      return basepath
    } else if (level === 1) {
      return []
    } else {
      return readdirSync(basepath)
        .map((x) => join(basepath, x))
        .flatMap(findFolder(find, level + 1))
    }
  }
}

export default function(plop: NodePlopAPI) {
  // console.time('auto discover generators')

  const paths = readdirSync(process.cwd())
    .filter((x) => x.includes('plop'))
    .map((x) => join(process.cwd(), x))
    .flatMap(findFolder('generators'))

  const generatorsPath = paths.find((path) => existsSync(path))

  if (!generatorsPath) {
    throw new Error('could not find generators folder')
  }

  // Discover and set generators in folder
  readdirSync(generatorsPath)
    .map((n) =>
      n
        .split('.')
        .slice(0, -1)
        .join('.'),
    )
    .filter((n) => n !== 'index')
    .map((n) => join(generatorsPath, n))
    .forEach((n) => {
      const { excluded = [], ...generatorModule } = importCwd(n) as Record<
        string,
        PlopGenerator
      > & { excluded: string[] }
      delete generatorModule.default

      Object.entries(module)
        .filter(([key]) => {
          return !excluded.includes(key)
        })
        .forEach(([key, generator]) => {
          plop.setGenerator(key, generator)
        })
    })

  // console.timeEnd('auto discover generators')
  // console.timeEnd('total load time')
}
