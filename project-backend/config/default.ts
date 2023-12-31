
// Necessary Back-End Configuration Properties (using NPM "config")
export default { 
    port: 3000,
    logLevel: "info",
    mongoDatabaseUri: `mongodb+srv://admin:${process.env.PASSWORD}@practice-mean-app.mzbvva2.mongodb.net/Aliens?retryWrites=true&w=majority`
};
