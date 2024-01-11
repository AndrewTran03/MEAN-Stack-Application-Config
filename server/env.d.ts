declare global {
    namespace NodeJS {
        interface ProcessEnv {
            // Secret enviornment variables (allows for TypeScript intellisense)
            BACKEND_PORT: number;
            FRONTEND_PORT: number;
            USERNAME: string;
            PASSWORD: string;
            DEPLOYMENT_NAME: string;
            MONGO_DB_NAME: string;
            ALIEN_COLLECTION_NAME: string;
            HUMAN_COLLECTION_NAME: string;
            AUTH_COLLECTION_NAME: string;
        }
    }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {};
