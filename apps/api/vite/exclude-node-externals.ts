import { nodeExternals } from 'rollup-plugin-node-externals'
import type { Plugin } from 'vite'

export function excludeNodeExternals(): Plugin {
  return {
    ...nodeExternals({
      // Options here if needed
    }),
    name: 'node-externals',
    enforce: 'pre', // The key is to run it before Vite's default dependency resolution plugin
    apply: 'build',
  }
}
