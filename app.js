const express = require("express");
const app = express();

const driveQuery = require("./containers/driveQuery");
const driveToken = require("./containers/driveToken");

// function handleRedirect (req, res) {
//   const targetBaseUrl = 'http://www.letsboot.com/'
//   const targetUrl = targetBaseUrl + req.originalUrl
//   res.redirect(targetUrl)
// }
// app.get('/boot', handleRedirect)

//CORS is annoying
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "*"
    // "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.header("Accept-Ranges", "bytes");
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

app.get("/", (req, res) =>
  res
    .status(200)
    .send("Hello, This is DriveLight https://github.com/solaris7x/drivelight")
);

app.get("/:folder/:segment", driveQuery);
// (req, res) => {
// console.log(req.params);
// res.send(req.params.folder);
// }

app.get("/gettoken", driveToken);

const port = process.env.PORT || 3001;
console.log("Listening on " + port);
app.listen(port);
