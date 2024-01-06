// import * as ts from 'typescript';

// Necessary Back-End Configuration Properties (using NPM "config")
export default {
    backendServerPort: `${process.env.BACKEND_PORT}`,
    backendServerUrl: `http://localhost:${process.env.BACKEND_PORT}`,
    frontendClientPort: `${process.env.FRONTEND_PORT}`,
    frontendClientUrl: `http://localhost:${process.env.FRONTEND_PORT}`,
    logLevel: "trace",
    alienMongoDatabaseUri: `mongodb+srv://${process.env.USERNAME}:${process.env.PASSWORD}@${process.env.ALIEN_DB_NAME}.mzbvva2.mongodb.net/${process.env.ALIEN_COLLECTION_NAME}?retryWrites=true&w=majority`,
    alienMongoDatabaseName: `${process.env.ALIEN_DB_NAME}`,
    alienMongoCollectionName: `${process.env.ALIEN_COLLECTION_NAME}`
};
