# !/bin/bash

echo "|-------- Beginning of Running Front-End Script --------|"
echo "Installing NPM Dependencies"
time npm install
echo "Running Angular Frontend:"
npm run format
npm run start
echo "|-------- End of Running Front-End Script --------|"
