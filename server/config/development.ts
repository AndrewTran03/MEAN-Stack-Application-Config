// Necessary Back-End Configuration Properties (using NPM "config")
export default {
  backendServerPort: `${process.env.BACKEND_PORT}`,
  backendServerUrl: `http://localhost:${process.env.BACKEND_PORT}`,
  frontendClientPort: `${process.env.FRONTEND_PORT}`,
  frontendClientUrl: `http://localhost:${process.env.FRONTEND_PORT}`,
  logLevel: "trace",
  mongoDatabaseUri: `mongodb+srv://${process.env.USERNAME}:${process.env.PASSWORD}@${process.env.DEPLOYMENT_NAME}.mzbvva2.mongodb.net/${process.env.MONGO_DB_NAME}?retryWrites=true&w=majority`,
  mongoDatabaseName: process.env.MONGO_DB_NAME,
  alienMongoCollectionName: process.env.ALIEN_COLLECTION_NAME,
  humanMongoCollectionName: process.env.HUMAN_COLLECTION_NAME,
  authMongoCollectionName: process.env.AUTH_COLLECTION_NAME
};
