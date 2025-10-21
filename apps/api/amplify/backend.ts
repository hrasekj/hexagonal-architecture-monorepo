import { defineBackend } from '@aws-amplify/backend'
import { Stack } from 'aws-cdk-lib'
import { CorsHttpMethod, HttpApi, HttpMethod } from 'aws-cdk-lib/aws-apigatewayv2'
import { HttpLambdaIntegration } from 'aws-cdk-lib/aws-apigatewayv2-integrations'
// import { Policy, PolicyStatement } from 'aws-cdk-lib/aws-iam'
import { helloWorldFunc } from './functions/hello-world/resource.js'

const backend = defineBackend({
  helloWorldFunc,
})

// create a new API stack
const apiStack = backend.createStack('api-stack')

// create a new HTTP Lambda integration
const httpLambdaIntegration = new HttpLambdaIntegration('LambdaIntegration', backend.helloWorldFunc.resources.lambda)

// create a new HTTP API with IAM as default authorizer
const httpApi = new HttpApi(apiStack, 'HttpApi', {
  apiName: 'helloWorldHttpApi',
  corsPreflight: {
    // Modify the CORS settings below to match your specific requirements
    allowMethods: [CorsHttpMethod.GET, CorsHttpMethod.POST, CorsHttpMethod.PUT, CorsHttpMethod.DELETE],
    // Restrict this to domains you trust
    allowOrigins: ['*'],
    // Specify only the headers you need to allow
    allowHeaders: ['*'],
  },
  createDefaultStage: true,
})

// add routes to the API with a IAM authorizer and different methods
httpApi.addRoutes({
  path: '/hello-world',
  methods: [HttpMethod.GET, HttpMethod.DELETE],
  integration: httpLambdaIntegration,
  // authorizer: iamAuthorizer,
})

// create a new IAM policy to allow Invoke access to the API
// const apiPolicy = new Policy(apiStack, 'ApiPolicy', {
//   statements: [
//     new PolicyStatement({
//       actions: ['execute-api:Invoke'],
//       resources: [`${httpApi.arnForExecuteApi('*', '/hello-world')}`],
//     }),
//   ],
// })

// attach the policy to the authenticated and unauthenticated IAM roles
// backend.auth.resources.authenticatedUserIamRole.attachInlinePolicy(apiPolicy)
// backend.auth.resources.unauthenticatedUserIamRole.attachInlinePolicy(apiPolicy)

// add outputs to the configuration file
backend.addOutput({
  custom: {
    API: {
      // biome-ignore lint/style/noNonNullAssertion: just ignore
      [httpApi.httpApiName!]: {
        endpoint: httpApi.url,
        region: Stack.of(httpApi).region,
        apiName: httpApi.httpApiName,
      },
    },
  },
})
