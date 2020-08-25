"use strict";

const express = require("express");
const SSE = require("express-sse");
const http = require("http");
const https = require("https");
const bodyParser = require("body-parser");
const fs = require("fs");
const dotenv = require("dotenv");

dotenv.config();
const app = express();
const sse = new SSE("Smith says hello.");

const options = {
  key: fs.readFileSync(process.env.KEY_FILE),
  cert: fs.readFileSync(process.env.CERT_FILE),
  ca: process.env.CERT_CHAIN.split(',').map((ca_cert_file) => {
    return fs.readFileSync(ca_cert_file);
  }),
};

app.use(express.static("public"));
app.use(bodyParser.raw({ inflate: true, limit: "10mb", type: "*/*" }));

app.get("/logstream", sse.init);

app.post("/splunk", (req, res) => {
  let currTime = new Date().toISOString();
  console.log(`${currTime}: log source [Splunk]`);
  console.log(`${req.body.toString()}\n`);
  sse.send(req.body.toString());
  res.json({ text: "Success", code: 0 });
});

http
  .createServer(app)
  .listen(process.env.HTTP_PORT, () =>
    console.log(`HTTP Server running on port ${process.env.HTTP_PORT}`)
  );
https
  .createServer(options, app)
  .listen(process.env.HTTPS_PORT, () =>
    console.log(`HTTPS Server running on port ${process.env.HTTPS_PORT}`)
  );
