import { defineConfig } from 'vite'
import { excludeNodeExternals } from './vite/exclude-node-externals.js'
import { nodeConfig } from './vite/node-config.js'

export default defineConfig({
  plugins: [excludeNodeExternals(), nodeConfig()],
})
