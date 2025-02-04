import { z } from "zod";
import { fromZodError } from "zod-validation-error";

import log from "./src/utils/logger";

// Include secret enviornment variables here
const PROCESS_ENV_SCHEMA = z
  .object({
    BACKEND_PORT: z.number().gte(1000),
    FRONTEND_PORT: z.number().gte(1000),
    USERNAME: z.string().min(1),
    PASSWORD: z.string().min(1),
    DEPLOYMENT_NAME: z.string().min(1),
    MONGO_DB_NAME: z.string().min(1),
    ALIEN_COLLECTION_NAME: z.string().min(1),
    HUMAN_COLLECTION_NAME: z.string().min(1),
    AUTH_COLLECTION_NAME: z.string().min(1)
  })
  .strict();
const envParseResult = PROCESS_ENV_SCHEMA.safeParse(process.env);
// Checking if enviornment variables (in ".env" file) were setup properly
if (!envParseResult.success) {
  log.error(fromZodError(envParseResult.error));
  process.exit(1);
}

// Allows for global TypeScript intellisense of process.env variables in the backend
declare global {
  namespace NodeJS {
    // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
    interface ProcessEnv extends z.infer<typeof PROCESS_ENV_SCHEMA> {}
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {};
