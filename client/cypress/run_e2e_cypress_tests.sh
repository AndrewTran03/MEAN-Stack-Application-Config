# !bin/bash

PORT=$1
rm -rf coverage # Remove any existing coverage folder

echo "|-------- Beginning of Running Cypress E2E Testing Front-End Script --------|"
echo "|-------- Freeing Testing Port ${PORT} Before Usage --------|"
function free_port_specified() {
    lsof -ti :$PORT | xargs kill -9 # Kill any processes running on port via CLI ARG for Cypress E2E Testing
    lsof -ti :3002 | xargs kill -9 # Kill any processes running on port 3002 for Cypress E2E Testing
}
free_port_specified
sleep 5

echo "|-------- Running Front-End Client in the Background --------|"
npm run start -- --port $PORT &

echo "|-------- Running Cypress E2E Testing Front-End Now --------|"
npm run test:e2e -- --env TESTING_WEB_URL="http://localhost:$PORT" &
PID=$! # Save the PID of the last process run in the background
wait $PID

echo "|-------- Show Cypress E2E Testing Code-Coverage --------|"
npm run cypress:code-cov-report
npm run test:e2e-code-cov

echo "If any tests failed, please check the logs above for more information. Regardless, please CTRL+C to stop the test client."
echo "|-------- End of Running Cypress E2E Testing Front-End Script --------|"
