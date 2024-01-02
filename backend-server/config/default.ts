
// Necessary Back-End Configuration Properties (using NPM "config")
export default {
    port: `${process.env.PORT}`,
    backendUrl: `http://localhost:${process.env.PORT}`,
    logLevel: "info",
    alienMongoDatabaseUri: `mongodb+srv://${process.env.USERNAME}:${process.env.PASSWORD}@${process.env.ALIEN_DB_NAME}.mzbvva2.mongodb.net/${process.env.ALIEN_COLLECTION_NAME}?retryWrites=true&w=majority`,
    alienMongoDatabaseName: `${process.env.ALIEN_DB_NAME}`,
    alienMongoCollectionName: `${process.env.ALIEN_COLLECTION_NAME}`
};
