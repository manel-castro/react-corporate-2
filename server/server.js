// NOT WORKING FOR CREATE_REACT_APP ENVIRONMENT

const http = require("http");
const path = require("path");
const express = require("express");

let wss;
let server;
const app = express();

app.use(express.static(path.join(__dirname, "./../dist")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./../dist/index.html"));
});

app.get("/services", (req, res) => {
  res.sendFile(path.join(__dirname, "./../dist/index.html"));
});

app.get("/contact", (req, res) => {
  res.sendFile(path.join(__dirname, "./../dist/index.html"));
});

app.get("/code-splitting", (req, res) => {
  res.sendFile(path.join(__dirname, "./../dist/index.html"));
});

app.get("/*", function (req, res) {
  res.status(404).send("404");
});

server = new http.createServer(app);

server.on("error", (err) => console.log("Server error:", err));
server.listen(process.env.PORT || 3000, () =>
  console.log("listening on port: ", process.env.PORT || 3000)
);
