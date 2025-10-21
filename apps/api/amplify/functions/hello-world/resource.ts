import { defineFunction } from '@aws-amplify/backend'

// Looking at the diagnostic errors, the issue is that TypeScript cannot infer
// a portable type for `helloWorldFunc` without referencing internal module paths.
// The solution is to add an explicit type annotation.

export const helloWorldFunc: ReturnType<typeof defineFunction> = defineFunction({
  name: 'hello-world',
})
