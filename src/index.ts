import { NodePlopAPI } from 'plop'
import autoDiscoverGenerators from './autoDiscoverGenerators'

export default function(plop: NodePlopAPI) {
  autoDiscoverGenerators(plop)
}
