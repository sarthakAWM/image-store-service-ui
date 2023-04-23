const fs = require('fs');

const http = require('http')
const https = require('https')
const express = require('express')
const path = require('path')

var DIST_DIR = path.join(__dirname);

var app = express();

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    next();
})

app.use(express.static(DIST_DIR));

app.get("/*", function(req, res) {
  res.sendFile(path.join(__dirname, "build/index.html"));
});

http.createServer(app).listen(3000);
