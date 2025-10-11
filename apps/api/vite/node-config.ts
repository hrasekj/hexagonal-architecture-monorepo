import path from 'node:path'
import type { Plugin } from 'vite'

type ConfigOptions = {
  entry?: string
}

export function nodeConfig(options?: ConfigOptions): Plugin {
  const entry = options?.entry ?? 'src/main.ts'

  return {
    name: 'node-config',
    config() {
      return {
        build: {
          lib: {
            entry: path.resolve(entry),
            formats: ['es'],
            fileName: (format) => `${path.basename(entry, path.extname(entry))}.${format}.js`,
          },
          rollupOptions: {
            // Additional Rollup options here
          },
        },
        resolve: {
          // Change default resolution to node rather than browser
          mainFields: ['module', 'jsnext:main', 'jsnext'],
          conditions: ['node'],
        },
      }
    },
    apply: 'build',
  }
}
