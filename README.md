# `@bumble/dot-plop`

A simple approach to PlopJS with first class TypeScript support and a one-line
plopfile.

## Installation

```sh
$ npm i plop @bumble/dot-plop -D
```

Put `plopfile.js` in your project directory:

```javascript
module.exports = require('@bumble/dot-plop')
```

## Usage

1. Create a new folder in your project directory called `.plop`.
2. Write your generators in TypeScript and put them in `.plop/generators`.
3. Write your helpers in TypeScript and put them in `.plop/helpers`.
4. We put our templates in `.plop/templates/`, but you can put them anywhere you
   like.
5. Run `plop` from the command line.

`dot-plop` will auto discover your generators and helpers. They will have the
same name as their export name.

## Examples

### `.plop/generators/my-generator.ts`

```typescript
import { PlopGenerator } from 'plop'

export const units: PlopGenerator = {
  description: 'Feature logic and API integrations',
  prompts: [
    {
      type: 'input',
      name: 'fileName',
      message: 'unit name please',
    },
  ],
  actions: [
    {
      type: 'add',
      path: 'src/units/{{dashCase fileName}}.ts',
      templateFile: '.plop/templates/units/unit.ts.hbs',
    },
    {
      type: 'add',
      path: 'src/units/{{dashCase fileName}}.test.ts',
      templateFile: '.plop/templates/units/unit.test.ts.hbs',
    },
  ],
}
```
