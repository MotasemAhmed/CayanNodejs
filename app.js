const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  // optionSuccessStatus: 200,
};

const app = express();
app.use(cors(corsOptions));
const port = 4000;

// const db = mysql.createConnection({
//   host: "153.92.6.148",
//   port: "3306",
//   user: "u697102081_testHostdb",
//   password: ":P2;n&dT2j",
//   database: "u697102081_TestDB",
// });

// db.connect((err) => {
//   if (err) {
//     throw err;
//   }
//   console.log("DB Connected");
// });

const pool = mysql.createPool({
  connectionLimit: 10,
  acquireTimeout: 10000,
  host: "153.92.6.148",
  port: "3306",
  user: "u697102081_testHostdb",
  password: ":P2;n&dT2j",
  database: "u697102081_TestDB",
});

app.get("/test", function (req, res, next) {
  var sql = "SELECT * FROM test";
  pool.query(sql, function (err, data, fields) {
    if (err) throw err;
    const result = Object.values(JSON.parse(JSON.stringify(data)));
    console.log(result);
    res.send(result);
  });
});

app.get("/hello", (req, res) => res.send("Hello World"));
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
