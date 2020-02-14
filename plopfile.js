// console.time('total load time')
// console.time('require with ts-node')

const project = require('path').join(__dirname, 'tsconfig.json')

require('ts-node').register({
  project,
  transpileOnly: true,
})

module.exports = require('./src/index.ts').default

// console.timeEnd('require with ts-node')
