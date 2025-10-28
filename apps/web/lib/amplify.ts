import { Amplify } from "aws-amplify";
import { parseAmplifyConfig } from "aws-amplify/utils";
import outputs from "@/amplify_outputs.json";

const config = parseAmplifyConfig(outputs);

Amplify.configure({
  ...config,
  API: {
    ...config.API,
    REST: outputs.custom.API,
  },
});
