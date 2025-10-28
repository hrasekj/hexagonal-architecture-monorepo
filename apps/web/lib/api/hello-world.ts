import { get, isCancelError } from "aws-amplify/api";

const operation = get({
  apiName: "helloWorldHttpApi",
  path: "/hello-world",
  options: {
    retryStrategy: {
      strategy: "no-retry",
    },
  },
});

const helloWorld: () => Promise<any> = async () => {
  try {
    const response = await operation.response;

    return await response.body.json();
  } catch (error) {
    if (isCancelError(error)) {
      return;
    }

    throw new Error("Failed to fetch hello world");
  }
};

export { helloWorld };
