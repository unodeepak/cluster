const express = require("express");
const app = express();
const cluster = require("cluster");
const os = require("os");
const cpuLen = os.cpus().length;

if (cluster.isPrimary) {
  for (let i = 0; i < cpuLen; i++) {
    cluster.fork();
  }
} else {
  app.get("/", (req, res) => {
    return res.json({ mas: `Request resolve id is: ${process.pid}` });
  });
  
  app.listen(5002, () => {
    console.log(`Server is running at port: 5002`);
  });
}
