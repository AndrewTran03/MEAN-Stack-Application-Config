
// Necessary Back-End Configuration Properties (using NPM "config")
export default { 
    port: 3000,
    logLevel: "info",
    mongoDatabaseUri: `mongodb+srv://${process.env.USERNAME}:${process.env.PASSWORD}@${process.env.DATABASE}.mzbvva2.mongodb.net/${process.env.ALIEN_COLLECTION}?retryWrites=true&w=majority`
};
