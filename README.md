# mockSplunk
Mock a Splunk HTTP Event Collector for troubleshooting

## Start
1. Change the file `.env.example` to `.env`, and modify the content if necessary.
2. (Optional), place the certificate and private key files under `cert` folder, and change the env variables accordingly in `.env` file
3. Run `npm i`
4. Run `npm start`
5. Open `http://localhost:8080`, or `https://localhost:8088` in the browser.
