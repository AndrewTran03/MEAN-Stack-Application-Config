# !/bin/bash

echo "|-------- Beginning of Running Back-End Script --------|"
echo "Installing NPM JS Dependencies:"
time npm install
echo "Running JavaScript MongoDB/Express.js/Node.js Backend (with TypeScript):"
npm run format
npm run start

echo "|-------- End of Running Back-End Script --------|"
